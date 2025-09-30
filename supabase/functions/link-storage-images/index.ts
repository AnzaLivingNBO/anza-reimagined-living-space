import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.51.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { roomId, bucketName, folderPath } = await req.json();

    if (!roomId || !bucketName || !folderPath) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters: roomId, bucketName, folderPath' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Listing files in bucket: ${bucketName}, path: ${folderPath}`);

    // List files in the storage bucket at the specified path
    const { data: files, error: listError } = await supabase.storage
      .from(bucketName)
      .list(folderPath);

    if (listError) {
      console.error('Error listing files:', listError);
      return new Response(
        JSON.stringify({ error: listError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!files || files.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No files found in the specified path' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Found ${files.length} files`);

    // Filter out folders (only keep files)
    const imageFiles = files.filter(file => !file.id === null && file.name);

    // Insert records into room_images table
    const imageRecords = imageFiles.map((file, index) => ({
      room_id: roomId,
      image_url: `https://${supabaseUrl.split('//')[1]}/storage/v1/object/public/${bucketName}/${folderPath}/${file.name}`,
      alt_text: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
      display_order: index
    }));

    const { data: insertedImages, error: insertError } = await supabase
      .from('room_images')
      .insert(imageRecords)
      .select();

    if (insertError) {
      console.error('Error inserting images:', insertError);
      return new Response(
        JSON.stringify({ error: insertError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Successfully linked ${insertedImages.length} images to room ${roomId}`);

    return new Response(
      JSON.stringify({
        message: `Successfully linked ${insertedImages.length} images`,
        images: insertedImages
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Function error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
