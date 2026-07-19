import { DomainToolModule } from "@/types/tool-content";
import { loveCalculatorContent } from "./love-calculator";
import { fancyFontGeneratorContent } from "./fancy-font-generator";
import { emojiReactionTestContent } from "./emoji-reaction-test";
import { decisionWheelContent } from "./decision-wheel";
import { coffeeToWealthContent } from "./coffee-to-wealth";
import { aiBioGeneratorContent } from "./ai-bio-generator";
import { techArchetypeQuizContent } from "./tech-archetype-quiz";
import { cosmicAgeClockContent } from "./cosmic-age-clock";
import { bmiCalculatorContent } from "./bmi-calculator";

export const DOMAIN_TOOLS_REPOSITORY: Record<string, DomainToolModule> = {
  "love-calculator": loveCalculatorContent,
  "fancy-font-generator": fancyFontGeneratorContent,
  "emoji-reaction-test": emojiReactionTestContent,
  "decision-wheel": decisionWheelContent,
  "coffee-to-wealth": coffeeToWealthContent,
  "ai-bio-generator": aiBioGeneratorContent,
  "tech-archetype-quiz": techArchetypeQuizContent,
  "cosmic-age-clock": cosmicAgeClockContent,
  "bmi-calculator": bmiCalculatorContent,
};

export function getToolContent(slug: string): DomainToolModule {
  return DOMAIN_TOOLS_REPOSITORY[slug] || loveCalculatorContent;
}
