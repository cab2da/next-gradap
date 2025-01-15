"use clienr"

import React from 'react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface ICardProps {
  title: string;
  description: string;
  txt1: string;
  txt2: string;
  buttons?: { label: string; onClick: () => void }[];
}

const StateCard = ({ title, description, txt1, txt2, buttons }: ICardProps) => {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className=" flex items-center space-x-4 rounded-md border p-4">
            <div className=" flex items-center space-x-1">
              <span className="flex h-1.5 w-1.5 translate-y-0 rounded-full bg-sky-500" />
              <p className="text-sm text-gray-700">{txt1}</p>
            </div>
            {txt2.length > 0 && (
            <div className=" flex items-center space-x-1">
              <span className="flex h-1.5 w-1.5 translate-y-0 rounded-full bg-sky-500" />
              <p className="text-sm text-gray-700">{txt2}</p>
            </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          {buttons && (
              <div className="flex w-full">
                {buttons.map((button, index) => (
                  <Button                 
                    key={index}
                    onClick={button.onClick}
                    className="flex w-full bg-red-400 "
                  >
                    {button.label}
                  </Button>
                ))}
              </div>
            )}
        </CardFooter>
    </Card>
  );
};

export default StateCard;
