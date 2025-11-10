import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AppCard from "@/components/AppCard";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
export default function Login() {
    const { login, loading } = useAuth()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ email: "", password: "" });
    const { toast } = useToast();
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = { email: "", password: "" };
        let isValid = true;

        if (!email.trim()) {
            newErrors.email = "Email is required";
            isValid = false;
        }

        if (!password.trim()) {
            newErrors.password = "Password is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            toast({
                title: "Validation Error",
                description: "Please fill in all required fields",
                variant: "destructive"
            });
            return;
        }

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
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (errors.email) setErrors({ ...errors, email: "" });
                                }}
                                placeholder="Enter your email"
                                className={`w-full ${errors.email ? "border-red-500" : ""}`}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Password
                            </label>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    if (errors.password) setErrors({ ...errors, password: "" });
                                }}
                                placeholder="Enter your password"
                                className={`w-full ${errors.password ? "border-red-500" : ""}`}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                            )}
                        </div>
                        <Button type="submit" className="w-full mt-2" disabled={loading}>
                            Sign In
                        </Button>
                    </form>
                </AppCard>
            </div>
        </div>
    );
}
