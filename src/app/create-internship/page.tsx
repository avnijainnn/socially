"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Loader2Icon, SendIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createInternship } from "@/actions/internship.action";
import toast from "react-hot-toast";

const yearLabels = ["FIRST", "SECOND", "THIRD", "FOURTH"];

type YearState = {
  FIRST: boolean;
  SECOND: boolean;
  THIRD: boolean;
  FOURTH: boolean;
};

function CreateInternship() {
  const { user } = useUser();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [applyUrl, setApplyUrl] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [eligibleYears, setEligibleYears] = useState<YearState>({
    FIRST: false,
    SECOND: false,
    THIRD: false,
    FOURTH: false,
  });

  const handleYearToggle = (year: keyof YearState) => {
    setEligibleYears((prev) => ({
      ...prev,
      [year]: !prev[year],
    }));
  };

  const handleSubmit = async () => {
    if (!title.trim() || !company.trim() || !description.trim()) return;

    setIsPosting(true);
    try {
        const result = await createInternship(
            title,
            company,
            description,
            Object.keys(eligibleYears).filter(
                (year) => eligibleYears[year as keyof YearState]
              ),
            location,
            salary ? parseFloat(salary) : undefined,
            applyUrl,
            startDate ? new Date(startDate) : undefined,
            endDate ? new Date(endDate) : undefined,
            
          );
          
      if (result?.success) {
        setTitle("");
        setCompany("");
        setDescription("");
        setLocation("");
        setSalary("");
        setApplyUrl("");
        setStartDate("");
        setEndDate("");
        setEligibleYears({ FIRST: false, SECOND: false, THIRD: false, FOURTH: false });
        toast.success("Internship created successfully");
        router.push("/");
      }
    } catch (error) {
      console.error("Failed to create internship:", error);
      toast.error("Failed to create internship");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex space-x-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user?.imageUrl || "/avatar.png"} />
            </Avatar>
            <div className="flex flex-col w-full space-y-2">
              <Input
                type="text"
                placeholder="Internship Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isPosting}
              />
              <Input
                type="text"
                placeholder="Company Name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                disabled={isPosting}
              />
              <Input
                type="text"
                placeholder="Location (Optional)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                disabled={isPosting}
              />
              <Input
                type="number"
                placeholder="Salary (Optional)"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                disabled={isPosting}
              />
              <Input
                type="url"
                placeholder="Application URL (Optional)"
                value={applyUrl}
                onChange={(e) => setApplyUrl(e.target.value)}
                disabled={isPosting}
              />
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                disabled={isPosting}
              />
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                disabled={isPosting}
              />
              <Textarea
                placeholder="Internship Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isPosting}
              />
            </div>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-bold">Eligible Years</h2>
            <div className="flex space-x-4">
              {yearLabels.map((year) => (
                <label key={year} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={eligibleYears[year as keyof YearState]}
                    onChange={() => handleYearToggle(year as keyof YearState)}
                    disabled={isPosting}
                  />
                  <span>{year}</span>
                </label>
              ))}
            </div>
          </div>

          <Button
            className="flex items-center"
            onClick={handleSubmit}
            disabled={!title.trim() || !company.trim() || !description.trim() || isPosting}
          >
            {isPosting ? (
              <>
                <Loader2Icon className="size-4 mr-2 animate-spin" />
                Posting...
              </>
            ) : (
              <>
                <SendIcon className="size-4 mr-2" />
                Post Internship
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
export default CreateInternship;