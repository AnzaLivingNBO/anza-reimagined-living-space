import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function LinkImages() {
  const [roomId, setRoomId] = useState("c62f9cb5-f857-4e55-97f0-aad79c243a57");
  const [bucketName, setBucketName] = useState("room-images");
  const [folderPath, setFolderPath] = useState("Prelax/BR1");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleLinkImages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('link-storage-images', {
        body: {
          roomId,
          bucketName,
          folderPath
        }
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: data.message,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Link Storage Images to Room</CardTitle>
          <CardDescription>
            Link images from Supabase storage bucket to a room in the database
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="roomId">Room ID</Label>
            <Input
              id="roomId"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Enter room ID"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bucketName">Bucket Name</Label>
            <Input
              id="bucketName"
              value={bucketName}
              onChange={(e) => setBucketName(e.target.value)}
              placeholder="room-images"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="folderPath">Folder Path</Label>
            <Input
              id="folderPath"
              value={folderPath}
              onChange={(e) => setFolderPath(e.target.value)}
              placeholder="Prelax/BR1"
            />
          </div>
          <Button 
            onClick={handleLinkImages} 
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Linking Images...
              </>
            ) : (
              'Link Images'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
