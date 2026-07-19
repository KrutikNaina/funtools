import { DomainToolModule } from "@/types/tool-content";

export const bmiCalculatorContent: DomainToolModule = {
  slug: "bmi-calculator",
  schemaType: "MedicalWebPage",
  keywords: {
    primary: "BMI Calculator",
    secondary: ["Body Mass Index Calculator", "Adult BMI Calculator", "WHO Weight Categories", "Calculate BMI Metric Imperial", "Healthy Weight Range"],
    longTail: [
      "free accurate body mass index bmi calculator online",
      "how to calculate adult bmi formula kg m2",
      "who body mass index categories chart for adults",
      "calculate bmi in feet inches and pounds imperial",
      "healthy body weight range calculator online free"
    ],
    lsi: ["body mass index", "world health organization", "metric imperial formula", "underweight normal overweight obese", "anthropometric measurement"],
    semantic: ["health mass index", "weight category gauge", "body composition indicator", "adult weight chart", "ideal weight range"],
    questionKeywords: ["how is bmi calculated", "what is healthy bmi range for adults", "is bmi accurate for athletes"],
    intentKeywords: ["calculate bmi score", "check body mass index", "find healthy weight range"]
  },
  metadata: {
    metaTitle: "BMI Calculator - Calculate Body Mass Index & WHO Health Categories",
    metaDescription: "Calculate your adult Body Mass Index (BMI) accurately with our free online calculator. Supports Metric (cm/kg) and Imperial (ft/lbs) units with World Health Organization health categories.",
    slug: "bmi-calculator",
    canonicalUrl: "https://funtools.com/tools/bmi-calculator",
    robots: "index, follow",
    openGraph: {
      title: "Body Mass Index (BMI) Calculator | FunTools Health",
      description: "Calculate adult BMI, category ranges & healthy weight guidelines.",
      url: "https://funtools.com/tools/bmi-calculator",
      type: "website"
    },
    twitterCard: {
      card: "summary_large_image",
      title: "BMI Calculator Online | FunTools",
      description: "Calculate your BMI score & weight category instantly."
    }
  },
  aiOverview: {
    oneSentence: "The FunTools BMI Calculator calculates adult Body Mass Index (BMI) in metric or imperial units according to World Health Organization (WHO) categories.",
    twoSentence: "The FunTools BMI Calculator measures body mass index by dividing body weight by height squared ($kg/m^2$). It classifies results into four WHO adult categories: Underweight (<18.5), Normal Weight (18.5-24.9), Overweight (25.0-29.9), and Obese (≥30.0).",
    summary50: "The FunTools BMI Calculator is a free health tool that computes adult Body Mass Index (BMI) using metric (cm/kg) or imperial (ft/lbs) measurements. Based on World Health Organization guidelines, it provides instant category classifications and healthy weight range analysis.",
    summary100: "The FunTools BMI Calculator calculates adult Body Mass Index (BMI) to assess weight relative to height. Supporting both Metric (centimeters and kilograms) and Imperial (feet, inches, and pounds) inputs, the engine computes $BMI = \text{weight} / \text{height}^2$. Results map to World Health Organization (WHO) classifications—Underweight, Normal Weight, Overweight, and Obese—giving users a clear health baseline alongside medical disclaimers.",
    summary200: "The FunTools BMI Calculator provides an intuitive, accessible tool for adult health assessment. Built with clean interactive unit toggles, users can switch between Metric (cm and kg) and Imperial (feet, inches, and pounds) systems. The underlying formula calculates Body Mass Index ($kg/m^2$ or $lbs/in^2 \times 703$). The calculated score is rendered on a color-coded gauge representing the four primary World Health Organization (WHO) adult categories: Underweight (BMI < 18.5), Normal Weight (BMI 18.5 - 24.9), Overweight (BMI 25 - 29.9), and Obese (BMI ≥ 30). While BMI serves as a valuable screening tool for general adult populations, the page highlights limitations regarding muscular athletes, pregnant individuals, and elderly adults, emphasizing that BMI should complement comprehensive medical consultation.",
    bulletSummary: [
      "Calculates adult Body Mass Index (BMI) using standard mathematical formulas.",
      "Supports Metric (cm & kg) and Imperial (feet/inches & lbs) units.",
      "Classifies results into WHO adult categories (Underweight, Normal, Overweight, Obese).",
      "Provides color-coded visual health category feedback.",
      "Includes medical disclaimers and educational health guidelines."
    ],
    tableSummary: [
      { label: "BMI Category", value: "WHO Standard Classification Range" },
      { label: "Underweight", value: "BMI Less than 18.5" },
      { label: "Normal Weight", value: "BMI 18.5 – 24.9" },
      { label: "Overweight", value: "BMI 25.0 – 29.9" },
      { label: "Obese Class", value: "BMI 30.0 or Greater" }
    ],
    comparisonSummary: {
      header: ["BMI Category", "BMI Range (kg/m²)", "Health Risk Indication"],
      rows: [
        ["Underweight", "< 18.5", "Increased risk of nutritional deficiency"],
        ["Normal Weight", "18.5 - 24.9", "Lowest average statistical health risk"],
        ["Overweight", "25.0 - 29.9", "Moderate risk of cardiovascular strain"],
        ["Obese Class", "≥ 30.0", "Higher statistical risk of metabolic conditions"]
      ]
    }
  },
  snippets: {
    paragraph: "Body Mass Index (BMI) is a numerical screening value calculated by dividing an individual's body weight in kilograms by the square of their height in meters ($kg/m^2$), used to categorize adults into weight status brackets.",
    list: [
      "Step 1: Select Metric (cm/kg) or Imperial (ft & in/lbs) unit mode.",
      "Step 2: Enter your height using the slider or input fields.",
      "Step 3: Enter your weight using the slider or input fields.",
      "Step 4: View your calculated numerical BMI score and WHO weight category."
    ],
    numbered: [
      "Select Metric or Imperial Units",
      "Input Height Measurement",
      "Input Weight Measurement",
      "View BMI Score & WHO Category"
    ],
    table: {
      headers: ["Classification", "BMI Range", "Healthy Target Note"],
      rows: [
        ["Underweight", "< 18.5", "Consult healthcare provider"],
        ["Normal Weight", "18.5 - 24.9", "Optimal general range"],
        ["Overweight", "25.0 - 29.9", "Consider lifestyle modifications"],
        ["Obese", "≥ 30.0", "Seek professional health guidance"]
      ]
    }
  },
  howTo: [
    { name: "Choose Unit", text: "Select Metric or Imperial unit toggle." },
    { name: "Input Height", text: "Set your height in cm or feet/inches." },
    { name: "Input Weight", text: "Set your weight in kg or pounds." },
    { name: "Review Score", text: "Inspect your calculated BMI score and category." }
  ],
  content: {
    heroHeadline: "Calculate Your Body Mass Index (BMI)",
    heroSubheading: "Check your adult BMI score, WHO health category, and healthy weight guidelines instantly.",
    introduction: "Body Mass Index (BMI) is an international screening tool established by the World Health Organization to help adults monitor weight relative to height.",
    definition: "Body Mass Index (BMI) is an anthropometric calculation defined as body mass divided by the square of body height ($kg/m^2$), used to classify adult body weight status.",
    formula: {
      title: "Body Mass Index Formula",
      explanation: "Metric formula is weight in kg divided by height in meters squared. Imperial multiplies by 703 factor:",
      mathNotation: "\text{BMI (Metric)} = \frac{\text{weight (kg)}}{\text{height (m)}^2} \quad \Big| \quad \text{BMI (Imperial)} = \frac{\text{weight (lbs)}}{\text{height (in)}^2} \times 703"
    },
    howItWorks: [
      "Unit Normalization: Imperial measurements (feet, inches, pounds) are converted or multiplied by the 703 scaling factor.",
      "Mathematical Division: Weight is divided by squared height measurement.",
      "Rounding & Mapping: The raw quotient is rounded to 1 decimal place and mapped against WHO adult categories.",
      "Visual Feedback: The calculated score renders on a color-coded status badge."
    ],
    examples: [
      { scenario: "Adult with Height 175 cm and Weight 70 kg", input: "175 cm, 70 kg (Metric)", output: "BMI: 22.9 - Normal Weight Range" },
      { scenario: "Adult with Height 5'9\" and Weight 185 lbs", input: "5'9\", 185 lbs (Imperial)", output: "BMI: 27.3 - Overweight Range" },
      { scenario: "Adult with Height 160 cm and Weight 45 kg", input: "160 cm, 45 kg (Metric)", output: "BMI: 17.6 - Underweight Range" }
    ],
    useCases: [
      { audience: "Adults Monitoring Fitness", description: "Establish a baseline body weight measurement when initiating wellness or nutrition plans." },
      { audience: "Personal Trainers & Coaches", description: "Use as an initial screening metric alongside body composition measurements." },
      { audience: "Health Educators", description: "Demonstrate WHO health categories in health literacy classes." }
    ],
    benefits: [
      { title: "Standardized WHO Benchmarks", description: "Calculates scores based on World Health Organization guidelines." },
      { title: "Dual Unit Support", description: "Seamlessly switches between Metric (cm/kg) and Imperial (ft/lbs)." },
      { title: "100% Private & Mobile Ready", description: "Runs locally in browser without recording personal health data." }
    ],
    features: [
      { title: "Unit Toggle Engine", description: "Instant switching between Metric and Imperial units." },
      { title: "Color-Coded Health Categories", description: "Visual indicators for Underweight, Normal, Overweight, and Obese." },
      { title: "Educational Guidance", description: "Clear explanations of BMI limitations for athletes and elderly individuals." }
    ],
    comparisonTable: {
      headers: ["Category", "Metric Formula", "Imperial Formula"],
      rows: [
        ["Normal Weight", "70 kg / (1.75m)² = 22.9", "154 lbs / (69in)² × 703 = 22.7"],
        ["Overweight", "85 kg / (1.75m)² = 27.8", "187 lbs / (69in)² × 703 = 27.6"],
        ["Obese Class", "100 kg / (1.75m)² = 32.7", "220 lbs / (69in)² × 703 = 32.5"]
      ]
    },
    accuracyStatement: "BMI is a statistical population screening tool. It does not measure body fat percentage directly and does not distinguish muscle mass from fat mass.",
    limitations: [
      "Muscular athletes may register a high BMI despite low body fat due to dense muscle tissue.",
      "Does not account for bone density, body water distribution, or fat distribution (visceral vs subcutaneous).",
      "Not applicable for pregnant women, children, or frail elderly individuals."
    ],
    bestPractices: [
      "Use BMI as a general screening baseline alongside waist circumference and fitness measurements.",
      "Consult a licensed physician or registered dietitian for comprehensive health assessments.",
      "Combine BMI monitoring with balanced nutrition and regular physical activity."
    ],
    expertTips: [
      "Measure height without shoes and weigh yourself in the morning for consistent measurements.",
      "If you engage in heavy strength training, evaluate body fat percentage or waist-to-hip ratio alongside BMI.",
      "Focus on sustainable healthy lifestyle habits rather than chasing specific numerical values."
    ],
    disclaimer: {
      type: "medical",
      text: "This Body Mass Index (BMI) Calculator is provided strictly for educational and screening purposes. It does not replace professional medical diagnosis, advice, or treatment. Always consult a qualified healthcare provider regarding individual health conditions."
    }
  },
  faqs: [
    { question: "What is Body Mass Index (BMI)?", answer: "Body Mass Index (BMI) is a simple numerical measurement calculated from height and weight, used by health organizations to classify weight categories in adults." },
    { question: "How is BMI calculated?", answer: "Metric formula: BMI = weight (kg) / [height (m)]². Imperial formula: BMI = [weight (lbs) / (height (in))²] * 703." },
    { question: "What is a healthy BMI range?", answer: "According to WHO guidelines, a healthy adult BMI ranges between 18.5 and 24.9." },
    { question: "Is the BMI Calculator free?", answer: "Yes, 100% free with unlimited calculations and zero registration required." },
    { question: "Is BMI accurate for athletes?", answer: "Not always. High-performance athletes with heavy muscle mass may receive an 'overweight' BMI score despite having low body fat." },
    { question: "Does BMI apply to children and teens?", answer: "Adult BMI categories do not apply to children. Pediatric growth percentiles require specialized age-and-sex WHO growth charts." },
    { question: "What is the difference between metric and imperial BMI math?", answer: "Metric uses kilograms and meters, while Imperial uses pounds and inches scaled by 703. Both yield equivalent final scores." },
    { question: "Is my personal height or weight saved?", answer: "No. All calculations run locally in your web browser. No medical or personal data is ever saved or transmitted." },
    { question: "What are the WHO BMI categories?", answer: "Underweight (<18.5), Normal Weight (18.5-24.9), Overweight (25.0-29.9), and Obese (≥30.0)." },
    { question: "Can I use the BMI Calculator on mobile devices?", answer: "Yes! FunTools is fully responsive with fluid unit sliders for iOS and Android devices." },
    { question: "Do I need to sign up for an account?", answer: "No registration or sign-up is required." },
    { question: "What should I do if my BMI is outside normal range?", answer: "Discuss your overall health, activity levels, and nutrition with a licensed medical practitioner." },
    { question: "Why does BMI matter in general health screening?", answer: "Population health studies correlate extreme BMI values with increased statistical risk for metabolic and cardiovascular conditions." },
    { question: "What are common mistakes when calculating BMI?", answer: "Measuring height with shoes on, using outdated weight figures, or applying adult BMI formulas to young children." },
    { question: "How to troubleshoot if sliders do not adjust?", answer: "Ensure JavaScript is enabled in your web browser and click directly on the slider track." },
    { question: "Does BMI measure body fat directly?", answer: "No. BMI calculates body mass density relative to height, but does not directly measure body fat percentage." },
    { question: "How often should I check my BMI?", answer: "Checking your BMI once a month or during routine health checkups provides an effective long-term baseline." },
    { question: "What are other health metrics to check alongside BMI?", answer: "Waist circumference, blood pressure, resting heart rate, and body fat percentage provide additional health insights." }
  ],
  peopleAlsoAsk: [
    { question: "What is normal BMI for a 30-year-old?", answer: "For all adults aged 20 and older, WHO considers 18.5 to 24.9 to be the normal weight BMI range." },
    { question: "Is BMI different for men and women?", answer: "The standard WHO adult formula uses the same height-weight mathematical calculation for both men and women." },
    { question: "How many pounds to drop 1 BMI point?", answer: "For an average-height adult (5'9\" / 175cm), losing approximately 6 to 7 pounds drops your score by 1 BMI point." }
  ],
  eeat: {
    authorName: "Sophia Patel",
    authorRole: "Finance & Health Editor",
    authorBio: "Sophia specializes in medical health metrics, wellness statistics, and quantitative personal metrics.",
    authorAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
    reviewerName: "Alex Rivers",
    reviewerRole: "Creative Director",
    lastUpdated: "July 19, 2026",
    contentVersion: "v3.0.0",
    readTime: "6 min read"
  },
  relatedTools: [
    { title: "Coffee to Wealth Calculator", slug: "coffee-to-wealth", category: "finance", relationReason: "Track your financial wellness alongside physical health metrics." },
    { title: "Cosmic Age Clock", slug: "cosmic-age-clock", category: "age", relationReason: "See your exact age in seconds and total lifetime heartbeats." },
    { title: "Emoji Reaction Speed Test", slug: "emoji-reaction-test", category: "gaming", relationReason: "Test your neurological reflex speed." },
    { title: "Ultimate Decision Wheel", slug: "decision-wheel", category: "random", relationReason: "Spin the wheel to pick your healthy dinner plan!" },
    { title: "Tech Archetype Quiz", slug: "tech-archetype-quiz", category: "personality", relationReason: "Discover your tech personality alter-ego." }
  ]
};
