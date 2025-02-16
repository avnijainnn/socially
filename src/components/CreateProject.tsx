'use client';

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import toast from "react-hot-toast";
import { createProject } from "@/actions/project.action";

export default function CreateProject({}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [github, setGithub] = useState("");
  const [live, setLive] = useState("");
  const [collaboration, setCollaboration] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      toast.error("Title and description are required.");
      return;
    }
    
    setIsSubmitting(true);
    try {
        const result = await createProject( title, description, github, live, collaboration);
        if (result?.success) {
      
      setTitle("");
      setDescription("");
      setGithub("");
      setLive("");
      setCollaboration(false);
      toast.success("Project created successfully!");}
    } catch (error) {
      toast.error("Failed to create project.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-6 shadow-md">
      <CardContent className="space-y-4">
        <Input
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          placeholder="GitHub URL (optional)"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
        />
        <Input
          placeholder="Live Demo URL (optional)"
          value={live}
          onChange={(e) => setLive(e.target.value)}
        />
        <div className="flex items-center gap-2">
          <Checkbox
            checked={collaboration}
            onCheckedChange={() => setCollaboration(!collaboration)}
          />
          <span>Looking for collaborators?</span>
        </div>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Create Project"}
        </Button>
      </CardContent>
    </Card>
  );
}
