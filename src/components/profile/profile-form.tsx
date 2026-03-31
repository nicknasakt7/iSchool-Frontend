"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  mockProfile,
  StudentProfile,
} from "../mocks/student/mock-student-profile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";

export default function ProfileForm() {
  const [data, setData] = useState<StudentProfile>(mockProfile);

  const handleChange = (key: keyof StudentProfile, value: string) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow space-y-6">
      {/* Profile Header */}
      <div className="flex items-center gap-4">
        <Image src="/images.png" alt="image" width={50} height={50} />
        <div>
          <p className="font-semibold">Profile Identity</p>
          <p className="text-sm text-gray-500">
            Upload a high-resolution photo
          </p>
          <button className="text-blue-600 text-sm">
            Change Profile Picture
          </button>
        </div>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Firstname</Label>
          <Input
            value={data.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            placeholder="First Name"
          />
        </div>
        <div className="space-y-1">
          <Label>Lastname</Label>
          <Input
            value={data.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            placeholder="Last Name"
          />
        </div>

        <div className="space-y-1">
          <Label>Nickname</Label>
          <Input
            value={data.nickName}
            onChange={(e) => handleChange("nickName", e.target.value)}
            placeholder="Nickname"
          />
        </div>

        <div className="space-y-1">
          <Label>Date of Brith</Label>
          <Input
            type="date"
            value={data.dob}
            onChange={(e) => handleChange("dob", e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <Label>Grade</Label>
          <Input
            value={data.grade}
            onChange={(e) => handleChange("grade", e.target.value)}
            placeholder="Grade"
          />
        </div>
        <div className="space-y-1">
          <Label>Classroom</Label>
          <Select
            value={data.classroom}
            onValueChange={(value) => handleChange("classroom", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select classroom" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="Section A - Creative Lab">
                Section A - Creative Lab
              </SelectItem>
              <SelectItem value="Section B - Science Lab">
                Section B - Science Lab
              </SelectItem>
              <SelectItem value="Section C - Math Lab">
                Section C - Math Lab
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-1">
        <Label>Favorite</Label>
        {/* Favorite */}
        <Input
          value={data.favorite}
          onChange={(e) => handleChange("favorite", e.target.value)}
          placeholder="Favorite Subject"
        />
      </div>

      <div className="space-y-1">
        <Label>Health Note</Label>
        {/* Health Note */}
        <textarea
          value={data.healthNote}
          onChange={(e) => handleChange("healthNote", e.target.value)}
          className="w-full border rounded-xl p-3 min-h-100px"
        />
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center">
        <button className="text-red-500 text-sm">🗑 Archive Profile</button>

        <div className="flex gap-2">
          <Button variant="ghost">Cancel</Button>
          <Button variant={"ghost"}>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
