"use client"

import { useState } from "react"
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
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 overflow-x-hidden">
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
            <Button disabled={loading} className="w-full" onClick={() => document.getElementById("picture").click()}>
              {loading ? "Analyzing..." : "Select an Image"}
            </Button>
          </CardFooter>
        </Card>
      </section>

      {/* Results Section */}
      {result && (
            <section id="result"className="container px-4 py-16 mx-auto">
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
            {[
              {
                question: "Is my image secure?",
                answer:
                  "Yes, we prioritize your privacy. Your image is processed securely and not stored on our servers. All analysis happens in real-time and no facial data is retained after processing.",
              },
              {
                question: "How accurate is the detection?",
                answer:
                  "Our AI is trained on a diverse dataset to ensure high accuracy across different ethnicities and facial structures. The algorithm analyzes multiple facial points to determine the closest match to standard face shape categories.",
              },
              {
                question: "Can I use this on mobile?",
                answer:
                  "Yes, our application is fully responsive and works on all devices including smartphones and tablets. You can take a selfie directly with your mobile device and upload it for analysis.",
              },
              {
                question: "What face shapes can be detected?",
                answer:
                  "Our AI can detect all common face shapes including oval, round, square, heart, diamond, rectangular, and triangular. The results show percentage matches to help you understand your unique facial structure.",
              },
              {
                question: "Do you offer styling recommendations?",
                answer:
                  "Currently, we focus on accurate face shape detection. We plan to add personalized styling recommendations for hairstyles, glasses, and makeup in a future update.",
              },
            ].map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
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
          </div>
        </div>
      </footer>
    </div>
  )
}

