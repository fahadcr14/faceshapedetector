"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Camera, Shield, Lightbulb, Upload, ChevronDown, User, Lock, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Navbar from "@/components/navbar"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [fileName, setFileName] = useState("")
  const [error, setError] = useState("")

  const uploadImage = async (event) => {
    const fileInput = event.target.files[0]
    if (!fileInput) return

    // Reset previous states
    setError("")
    setResult(null)
    setFileName(fileInput.name)
    setLoading(true)

    // Create form data
    const formData = new FormData()
    formData.append("file", fileInput)


    
    if (fileInput) {
      formData.append("file", fileInput);

      try {
        const res = await axios.post("/api/predict", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // Process the API response and set the result
        const apiResponse = res.data;
        const sortedResult = Object.entries(apiResponse)
          .sort((a, b) => b[1] - a[1]) // Sort based on percentage
          .map(([shape, percentage]) => ({
            shape,
            percentage: percentage.toFixed(2),
          }));

        // Set the result state
        const topShape = sortedResult[0].shape;
        const topPercentage = sortedResult[0].percentage;

        setResult({
          sortedResult,
          topShape: topShape.charAt(0).toUpperCase() + topShape.slice(1),
          topPercentage,
        });
      } catch (err) {
        console.error("Error:", err);
        setError("An error occurred while uploading the image.");
      }
    }

    setLoading(false);
    document.getElementById("result")?.scrollIntoView({ behavior: "smooth" });


  }
  const faqData=[
    {
      question: "What is Face Shape Detection and How Does it Work?",
      answer:
        "Face shape detection uses AI and advanced computer vision techniques to analyze the proportions and features of your face, determining the most accurate face shape from categories like oval, round, square, and more.",
    },
    {
      question: "How Can I Detect My Face Shape Accurately?",
      answer:
        "You can detect your face shape accurately by uploading a front-facing photo of your face. Our AI-powered tool analyzes key facial landmarks such as the forehead, jawline, and cheekbones to identify your unique face shape.",
    },
    {
      question: "Can I Use Face Shape Detection on Mobile Devices?",
      answer:
        "Yes, our face shape detector works seamlessly on mobile devices, allowing you to detect your face shape easily from your smartphone or tablet with a simple selfie upload.",
    },
    {
      question: "How Does the Face Shape Detector Analyze My Face?",
      answer:
        "The face shape detector analyzes key facial points such as your forehead, cheekbones, jawline, and chin. By measuring and comparing these features, it determines the closest match to one of the common face shapes.",
    },
    {
      question: "Is the Face Shape Detector Free to Use?",
      answer:
        "Yes, the face shape detection tool is free to use. You can upload a photo and receive instant face shape analysis without any charges or hidden fees.",
    },
    {
      question: "What Types of Face Shapes Can the Detector Identify?",
      answer:
        "Our face shape detector can identify various face shapes, including oval, round, square, heart, diamond, rectangular, and oblong, offering detailed insights into your facial structure.",
    },
    {
      question: "Can the Face Shape Detector Identify Face Shapes from Side Profile Photos?",
      answer:
        "For optimal accuracy, the face shape detector works best with front-facing photos. Side profile photos may not provide the necessary detail for precise face shape analysis.",
    },
    {
      question: "What Information Does the Face Shape Detector Extract from My Photo?",
      answer:
        "The face shape detector extracts key measurements and ratios of your face, including the width of your forehead, cheekbones, and jawline, as well as the overall length of your face.",
    },
    {
      question: "What’s the Best Way to Take a Photo for Face Shape Detection?",
      answer:
        "For the best results, use a clear, well-lit, front-facing photo of your face. Avoid using group photos or images with heavy angles, as they may affect the accuracy of the face shape detection.",
    },
    {
      question: "How Can Knowing My Face Shape Help with Fashion?",
      answer:
        "Knowing your face shape helps you make better fashion and styling decisions, such as selecting hairstyles, glasses, and makeup that complement your unique facial features.",
    },
    {
      question: "Can I Use the Face Shape Detector for Group Photos?",
      answer:
        "The face shape detector works best with individual photos. Group photos can distort the results, as the tool may struggle to accurately identify multiple faces in one image.",
    },
    {
      question: "How Accurate is the Face Shape Detection Tool?",
      answer:
        "Our face shape detection tool is highly accurate, powered by advanced AI algorithms trained on thousands of diverse facial images to ensure precision across different facial structures.",
    },
    {
      question: "What Should I Do If My Face Shape Doesn’t Match a Category?",
      answer:
        "If your face shape doesn’t match a specific category, the tool will provide a closest match based on the key facial landmarks. Contact support for more tailored assistance or styling recommendations.",
    },
    {
      question: "Can I Try Different Hairstyles Based on My Face Shape?",
      answer:
        "Yes, once your face shape is detected, you can explore hairstyle recommendations that suit your face shape, allowing you to choose a style that highlights your best features.",
    },
    {
      question: "What Face Shapes Are Most Commonly Detected?",
      answer:
        "The most commonly detected face shapes are oval, round, square, and heart-shaped, each offering unique characteristics and suitable styling options.",
    },
    {
      question: "How Can Face Shape Detection Improve My Style Choices?",
      answer:
        "Knowing your face shape allows you to make better style choices, from choosing the right clothing that complements your body shape to picking accessories like glasses and hats that enhance your facial features.",
    },
    {
      question: "Is My Image Stored After Using the Face Shape Detector?",
      answer:
        "No, your photo is not stored after the analysis. All images are processed securely and immediately discarded to ensure your privacy and data protection.",
    },
    {
      question: "What Are the Benefits of Using a Face Shape Detector for Fashion and Beauty?",
      answer:
        "Using a face shape detector helps you find the perfect hairstyle, glasses, and makeup that match your facial features, making it easier to achieve a stylish, well-rounded look.",
    },
    {
      question: "Can I Use the Face Shape Detector to Choose Glasses for My Face Shape?",
      answer:
        "Yes, after detecting your face shape, you can receive personalized recommendations for glasses that suit your specific face shape, enhancing your overall appearance.",
    },
    {
      question: "Why Is It Important to Know Your Face Shape for Dressing Well?",
      answer:
        "Understanding your face shape is essential for dressing well. It helps you choose outfits and accessories that highlight your best features, making you look more confident and stylish.",
    },

  ]
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqData.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer,
        },
      })),
    };

    // Inject structured data into the page
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }, []);
  return (
    <div className="bmin-h-screen bg-gradient-to-b from-background to-background/80 overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="container px-4 py-16 mx-auto text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Detect Your <span className="text-primary">Face Shape</span> with AI
          </h1>
          <p className="text-lg text-muted-foreground md:text-xl">
            Upload a photo and our AI will analyze your unique facial structure in seconds.
          </p>
          <div className="pt-6">
            <Button size="lg" className="rounded-full" asChild>
              <a href="#detect">
                Analyze My Face Shape
                <ChevronDown className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container px-4 py-16 mx-auto">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Advanced Features</h2>
          <p className="mt-4 text-muted-foreground">
            Our AI-powered tool provides accurate face shape analysis with personalized insights
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Card>
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <Camera className="w-6 h-6" />
              </div>
              <CardTitle>Face Shape Detection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Upload your image and let AI detect your face shape with high accuracy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <Lightbulb className="w-6 h-6" />
              </div>
              <CardTitle>Personalized Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Get tailored recommendations based on your unique face shape.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <CardTitle>Privacy Protected</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Your privacy is our priority. Images are processed securely and not stored.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Upload Section */}
      <section id="detect" className="container px-4 py-16 mx-auto">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Analyze Your Face Shape</h2>
          <p className="mt-4 text-muted-foreground">Upload a clear photo of your face for the most accurate results</p>
        </div>

        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Upload Your Photo</CardTitle>
            <CardDescription>Your image is processed securely and never stored</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label
                htmlFor="picture"
                className="text-center p-10 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
              >
                {fileName ? (
                  <div className="flex flex-col items-center gap-2">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                    <span className="text-sm text-muted-foreground">{fileName}</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Click to select an image</span>
                  </div>
                )}
                <Input id="picture" type="file" accept="image/*" onChange={uploadImage} className="sr-only" />
              </Label>
            </div>

            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {loading && (
              <div className="mt-4 text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                <p className="mt-2 text-muted-foreground">Analyzing your image...</p>
                <p className="text-xs text-muted-foreground">This may take up to 30 seconds</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
          {result ? (
          <Button asChild>
            <a href="#result" className="block w-full text-center">
              View Results
            </a>
          </Button>
        ) : (
          <Button
            disabled={loading}
            className="w-full"
            onClick={() => document.getElementById("picture")?.click()}
          >
            {loading ? "Analyzing..." : "Select an Image"}
          </Button>
        )}

            
          </CardFooter>
        </Card>
      </section>

      {/* Results Section */}
      {result && (
            <section id="result" className="container px-4 py-16 mx-auto">
              <div className="max-w-3xl mx-auto mb-16 text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Your Results</h2>
                <p className="mt-4 text-muted-foreground">Based on our AI analysis of your facial structure</p>
              </div>

              <Card className="max-w-2xl mx-auto">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl">
                    Your face shape is <span className="text-primary">{result.topShape}</span>
                  </CardTitle>
                  <CardDescription className="text-lg">{result.topPercentage}% match</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {result.sortedResult.map(({ shape, percentage }) => (
                    <div key={shape} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium capitalize">{shape}</span>
                        <span>{percentage}%</span>
                      </div>
                      <Progress value={parseFloat(percentage)} className="h-2" />
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="outline" asChild
                  >
                    <a href="#detect">Try Another Photo</a>
                  </Button>
                </CardFooter>
              </Card>
            </section>
          )}

      {/* Testimonials Section */}
      <section className="container px-4 py-16 mx-auto">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What Our Users Say</h2>
          <p className="mt-4 text-muted-foreground">
            Thousands of people have discovered their face shape with our tool
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              name: "Alex",
              review: "Amazing tool! Helped me understand my face shape easily and choose better hairstyles.",
              initial: "A",
            },
            {
              name: "Jamie",
              review: "Fast and accurate results. The analysis matched what my stylist told me!",
              initial: "J",
            },
            {
              name: "Taylor",
              review: "The insights are spot on. Great app for styling tips based on face shape.",
              initial: "T",
            },
          ].map((testimonial, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>{testimonial.initial}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{testimonial.name}</CardTitle>
                    <CardDescription>Verified User</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{testimonial.review}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container px-4 py-16 mx-auto">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently Asked Questions</h2>
          <p className="mt-4 text-muted-foreground">
            Find answers to common questions about our face shape detection tool
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
          {faqData.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="shadow p-1 rounded-xl">
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="container px-4 py-12 mx-auto">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <User className="h-6 w-6" />
              <span className="text-xl font-semibold">Face Shape Detect</span>
            </div>
            <div className="flex items-center gap-4">
              <Lock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Your privacy is protected</span>
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Face Shape Detect. All rights reserved.
            </p>
            <a href="https://aihubs.ai/" title="AiHubs - Discover The Best AI Tools" rel="nofollow">AiHubs</a>
            <a href='https://game-sprunki.com/' title='Game Sprunki' rel="nofollow">Game Sprunki</a>
            <a title="All The Best AI Tools" rel="nofollow" href="https://allinai.tools">All in AI Tools</a>
            <a href="https://aistage.net" rel="nofollow" title="AIStage">AIStage</a>
            <a href="https://www.dir2ai.com" rel="nofollow" title="Dir2AI - Best AI Websites and Tools">Dir2AI</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

