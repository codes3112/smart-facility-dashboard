import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AppCard from "@/components/AppCard";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
export default function Login() {
    const { login } = useAuth()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const result = await login(email, password)
        if (result.success) {
            toast({ title: "Login successful", description: "Welcome back!" })
            navigate("/dashboard");
        } else {
            toast({ title: "Login failed", description: result.error || "Invalid credentials", variant: "destructive" })
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900 p-4">
            <div className="w-full max-w-md">
                <AppCard header="Login to Smart Energy Dashboard">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Email
                            </label>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Password
                            </label>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full"
                            />
                        </div>
                        <Button type="submit" className="w-full mt-2">
                            Sign In
                        </Button>
                    </form>
                </AppCard>
            </div>
        </div>
    );
}
