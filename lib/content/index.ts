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

// 11 New Tool Content Imports
import { usernameGeneratorContent } from "./username-generator";
import { passwordGeneratorContent } from "./password-generator";
import { dateCalculatorContent } from "./date-calculator";
import { dateDifferenceCalculatorContent } from "./date-difference-calculator";
import { percentageCalculatorContent } from "./percentage-calculator";
import { randomNumberGeneratorContent } from "./random-number-generator";
import { qrCodeGeneratorContent } from "./qr-code-generator";
import { reactionTimeTestContent } from "./reaction-time-test";
import { countdownTimerContent } from "./countdown-timer";
import { luckyNumberGeneratorContent } from "./lucky-number-generator";
import { nicknameGeneratorContent } from "./nickname-generator";
import { deathCalculatorContent } from "./death-calculator";
import { textRepeaterContent } from "./text-repeater";
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

  // 11 New Tool Modules
  "username-generator": usernameGeneratorContent,
  "password-generator": passwordGeneratorContent,
  "date-calculator": dateCalculatorContent,
  "date-difference-calculator": dateDifferenceCalculatorContent,
  "percentage-calculator": percentageCalculatorContent,
  "random-number-generator": randomNumberGeneratorContent,
  "qr-code-generator": qrCodeGeneratorContent,
  "reaction-time-test": reactionTimeTestContent,
  "countdown-timer": countdownTimerContent,
  "lucky-number-generator": luckyNumberGeneratorContent,
  "nickname-generator": nicknameGeneratorContent,
  "death-calculator": deathCalculatorContent,
  "text-repeater": textRepeaterContent,
};

export function getToolContent(slug: string): DomainToolModule {
  return DOMAIN_TOOLS_REPOSITORY[slug] || loveCalculatorContent;
}
