import { useState } from "react";
import { motion } from "framer-motion";
import {
  Gift,
  Star,
  Trophy,
  Zap,
  Crown,
  ArrowRight,
  ShoppingCart,
  TrendingUp,
  Clock,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const tiers = [
  {
    name: "Bronze",
    icon: Star,
    minPoints: 0,
    color: "text-amber-700",
    bg: "bg-amber-100",
    perks: ["1 point per $1 spent", "Birthday bonus (50 pts)", "Early sale access"],
  },
  {
    name: "Silver",
    icon: Zap,
    minPoints: 500,
    color: "text-slate-500",
    bg: "bg-slate-100",
    perks: ["1.5x points multiplier", "Free delivery over $30", "Exclusive coupons"],
  },
  {
    name: "Gold",
    icon: Trophy,
    minPoints: 1500,
    color: "text-yellow-600",
    bg: "bg-yellow-50",
    perks: ["2x points multiplier", "Free delivery always", "Priority support", "Monthly surprise box"],
  },
  {
    name: "Platinum",
    icon: Crown,
    minPoints: 5000,
    color: "text-purple-600",
    bg: "bg-purple-50",
    perks: ["3x points multiplier", "Free express delivery", "VIP early access", "Annual gift hamper", "Personal shopper"],
  },
];

const rewards = [
  { id: "r1", name: "$5 Off Your Order", points: 200, icon: ShoppingCart },
  { id: "r2", name: "$10 Off Your Order", points: 400, icon: ShoppingCart },
  { id: "r3", name: "Free Delivery Pass (7 days)", points: 150, icon: Zap },
  { id: "r4", name: "Mystery Snack Box", points: 350, icon: Gift },
  { id: "r5", name: "$25 Off Your Order", points: 900, icon: ShoppingCart },
  { id: "r6", name: "Premium Spice Kit", points: 600, icon: Star },
];

const earnMethods = [
  { action: "Every $1 spent", points: "1 pt", icon: ShoppingCart },
  { action: "Write a product review", points: "25 pts", icon: Star },
  { action: "Refer a friend", points: "100 pts", icon: Gift },
  { action: "First purchase of the month", points: "50 pts", icon: TrendingUp },
];

const mockHistory = [
  { id: 1, description: "Purchase - Order KYO-2026-001", points: 33, type: "earned" as const, date: "Feb 9, 2026" },
  { id: 2, description: "Product Review - Basmati Rice", points: 25, type: "earned" as const, date: "Feb 8, 2026" },
  { id: 3, description: "Redeemed - $5 Off Coupon", points: -200, type: "redeemed" as const, date: "Feb 5, 2026" },
  { id: 4, description: "Purchase - Order KYO-2026-002", points: 52, type: "earned" as const, date: "Feb 4, 2026" },
  { id: 5, description: "Referral Bonus - Sita K.", points: 100, type: "earned" as const, date: "Jan 28, 2026" },
  { id: 6, description: "First Purchase Bonus", points: 50, type: "earned" as const, date: "Jan 15, 2026" },
  { id: 7, description: "Purchase - Order KYO-2025-089", points: 41, type: "earned" as const, date: "Jan 12, 2026" },
];

export default function Rewards() {
  const [redeeming, setRedeeming] = useState<string | null>(null);

  // Mock user data
  const userPoints = 780;
  const currentTierIndex = tiers.findIndex(
    (t, i) => userPoints >= t.minPoints && (i === tiers.length - 1 || userPoints < tiers[i + 1].minPoints)
  );
  const currentTier = tiers[currentTierIndex];
  const nextTier = tiers[currentTierIndex + 1];
  const progressToNext = nextTier
    ? ((userPoints - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100
    : 100;

  const handleRedeem = (rewardId: string) => {
    setRedeeming(rewardId);
    setTimeout(() => setRedeeming(null), 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 container py-8 max-w-5xl">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Gift className="h-4 w-4" />
            Kyoudai Rewards
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            Earn Points, Unlock Rewards
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Every purchase brings you closer to exclusive perks, discounts, and free treats.
          </p>
        </motion.div>

        {/* Points Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="mb-8 overflow-hidden">
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Your Balance</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-display font-bold text-primary">{userPoints}</span>
                    <span className="text-lg text-muted-foreground">points</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <currentTier.icon className={`h-5 w-5 ${currentTier.color}`} />
                    <span className="font-medium">{currentTier.name} Member</span>
                  </div>
                </div>

                {nextTier && (
                  <div className="flex-1 max-w-sm">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">
                        {nextTier.minPoints - userPoints} pts to {nextTier.name}
                      </span>
                      <span className="font-medium">{nextTier.minPoints} pts</span>
                    </div>
                    <Progress value={progressToNext} className="h-3" />
                  </div>
                )}
              </div>
            </div>
          </Card>
        </motion.div>

        <Tabs defaultValue="rewards" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-lg mx-auto">
            <TabsTrigger value="rewards">Redeem</TabsTrigger>
            <TabsTrigger value="earn">Earn</TabsTrigger>
            <TabsTrigger value="tiers">Tiers</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* Redeem Tab */}
          <TabsContent value="rewards">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {rewards.map((reward, i) => {
                const canAfford = userPoints >= reward.points;
                const isRedeeming = redeeming === reward.id;
                const Icon = reward.icon;
                return (
                  <motion.div
                    key={reward.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card className={`h-full transition-all ${canAfford ? "hover:shadow-elevated" : "opacity-60"}`}>
                      <CardContent className="p-5 flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <Badge variant="secondary" className="font-bold">
                            {reward.points} pts
                          </Badge>
                        </div>
                        <p className="font-medium text-foreground mb-4 flex-1">{reward.name}</p>
                        <Button
                          size="sm"
                          className="w-full"
                          disabled={!canAfford || isRedeeming}
                          onClick={() => handleRedeem(reward.id)}
                        >
                          {isRedeeming ? (
                            <>
                              <CheckCircle2 className="h-4 w-4 mr-1" /> Redeemed!
                            </>
                          ) : canAfford ? (
                            "Redeem"
                          ) : (
                            "Not Enough Points"
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>

          {/* Earn Tab */}
          <TabsContent value="earn">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ways to Earn Points</CardTitle>
              </CardHeader>
              <CardContent className="space-y-0">
                {earnMethods.map((method, i) => {
                  const Icon = method.icon;
                  return (
                    <div key={i}>
                      {i > 0 && <Separator />}
                      <div className="flex items-center justify-between py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-medium text-sm">{method.action}</span>
                        </div>
                        <Badge variant="outline" className="font-bold">
                          +{method.points}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tiers Tab */}
          <TabsContent value="tiers">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tiers.map((tier, i) => {
                const Icon = tier.icon;
                const isCurrent = i === currentTierIndex;
                return (
                  <motion.div
                    key={tier.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card className={`h-full ${isCurrent ? "ring-2 ring-primary" : ""}`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-9 h-9 rounded-full ${tier.bg} flex items-center justify-center`}>
                              <Icon className={`h-5 w-5 ${tier.color}`} />
                            </div>
                            <CardTitle className="text-lg">{tier.name}</CardTitle>
                          </div>
                          {isCurrent && <Badge>Current</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {tier.minPoints === 0 ? "Starting tier" : `${tier.minPoints}+ points`}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {tier.perks.map((perk) => (
                            <li key={perk} className="flex items-center gap-2 text-sm">
                              <ChevronRight className="h-3.5 w-3.5 text-primary shrink-0" />
                              {perk}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Points History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-0">
                {mockHistory.map((entry, i) => (
                  <div key={entry.id}>
                    {i > 0 && <Separator />}
                    <div className="flex items-center justify-between py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            entry.type === "earned" ? "bg-fresh/10" : "bg-cta/10"
                          }`}
                        >
                          {entry.type === "earned" ? (
                            <TrendingUp className="h-4 w-4 text-fresh" />
                          ) : (
                            <Gift className="h-4 w-4 text-cta" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{entry.description}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {entry.date}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`font-bold text-sm ${
                          entry.type === "earned" ? "text-fresh" : "text-cta"
                        }`}
                      >
                        {entry.points > 0 ? "+" : ""}
                        {entry.points} pts
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
