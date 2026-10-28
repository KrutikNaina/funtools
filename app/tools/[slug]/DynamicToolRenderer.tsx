"use client";

import { useState, useEffect } from "react";
import { Tool } from "@/types/tool";
import LoveCalculator from "@/components/tools/LoveCalculator";
import FancyFontGenerator from "@/components/tools/FancyFontGenerator";
import ReactionSpeedTest from "@/components/tools/ReactionSpeedTest";
import DecisionWheel from "@/components/tools/DecisionWheel";
import CoffeeWealthCalculator from "@/components/tools/CoffeeWealthCalculator";
import AIBioGenerator from "@/components/tools/AIBioGenerator";
import TechArchetypeQuiz from "@/components/tools/TechArchetypeQuiz";
import CosmicAgeClock from "@/components/tools/CosmicAgeClock";
import BMICalculator from "@/components/tools/BMICalculator";

// 11 New Tool Imports
import UsernameGenerator from "@/components/tools/UsernameGenerator";
import PasswordGenerator from "@/components/tools/PasswordGenerator";
import DateCalculator from "@/components/tools/DateCalculator";
import DateDifferenceCalculator from "@/components/tools/DateDifferenceCalculator";
import PercentageCalculator from "@/components/tools/PercentageCalculator";
import RandomNumberGenerator from "@/components/tools/RandomNumberGenerator";
import QRCodeGenerator from "@/components/tools/QRCodeGenerator";
import CountdownTimer from "@/components/tools/CountdownTimer";
import LuckyNumberGenerator from "@/components/tools/LuckyNumberGenerator";
import NicknameGenerator from "@/components/tools/NicknameGenerator";
import DeathCalculator from "@/components/tools/DeathCalculator";
import TextRepeater from "@/components/tools/TextRepeater";

import ShareModal from "@/components/ShareModal";
import { Share2 } from "lucide-react";
import WhatsNext from "@/components/recommendations/WhatsNext";
import KeepExploring from "@/components/recommendations/KeepExploring";
import CategoryDiscovery from "@/components/recommendations/CategoryDiscovery";
import { recordToolView } from "@/lib/recommendations";

export default function DynamicToolRenderer({ tool }: { tool: Tool }) {
  const [shareOpen, setShareOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    recordToolView(tool.slug, tool.category);

    const handleEvent = (e: Event) => {
      const custom = e as CustomEvent<{ toolSlug?: string; name: string }>;
      if (
        (custom.detail?.name === "tool_complete" || custom.detail?.name === "result_generated") &&
        custom.detail?.toolSlug === tool.slug
      ) {
        setIsCompleted(true);
      }
    };

    window.addEventListener("funtools_event", handleEvent);
    return () => window.removeEventListener("funtools_event", handleEvent);
  }, [tool.slug, tool.category]);

  const renderTool = () => {
    switch (tool.slug) {
      case "love-calculator":
        return <LoveCalculator />;
      case "fancy-font-generator":
        return <FancyFontGenerator />;
      case "reaction-time-test":
        return <ReactionSpeedTest />;
      case "decision-wheel":
        return <DecisionWheel />;
      case "coffee-to-wealth":
        return <CoffeeWealthCalculator />;
      case "ai-bio-generator":
        return <AIBioGenerator />;
      case "tech-archetype-quiz":
        return <TechArchetypeQuiz />;
      case "cosmic-age-clock":
        return <CosmicAgeClock />;
      case "bmi-calculator":
        return <BMICalculator />;

      // 11 New Tool Switch Cases
      case "username-generator":
        return <UsernameGenerator />;
      case "password-generator":
        return <PasswordGenerator />;
      case "date-calculator":
        return <DateCalculator />;
      case "date-difference-calculator":
        return <DateDifferenceCalculator />;
      case "percentage-calculator":
        return <PercentageCalculator />;
      case "random-number-generator":
        return <RandomNumberGenerator />;
      case "qr-code-generator":
        return <QRCodeGenerator />;
      case "countdown-timer":
        return <CountdownTimer />;
      case "lucky-number-generator":
        return <LuckyNumberGenerator />;
      case "nickname-generator":
        return <NicknameGenerator />;
      case "death-calculator":
        return <DeathCalculator />;
      case "text-repeater":
        return <TextRepeater />;

      default:
        return <FancyFontGenerator />;
    }
  };

  const currentUrl = typeof window !== "undefined" ? window.location.href : `https://www.getfuntools.app/tools/${tool.slug}`;

  return (
    <div className="space-y-4">
      {/* Interactive Tool Component */}
      {renderTool()}

      {/* Completion Experience: Keep Exploring */}
      {isCompleted && <KeepExploring currentTool={tool} />}

      {/* Contextual What's Next Recommendations */}
      <WhatsNext currentTool={tool} />

      {/* Category Cross-Discovery */}
      <CategoryDiscovery currentCategory={tool.category} />

      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        title={tool.title}
        url={currentUrl}
      />
    </div>
  );
}
