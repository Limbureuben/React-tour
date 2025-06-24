import { useState } from 'react';

export default function AnimatedRegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center p-4">
      <div className="card w-full max-w-md shadow-2xl bg-base-100 transition-all duration-500 transform hover:scale-[1.01]">
        <div className="card-body p-8">
          {/* Header */}
          <div className="text-center mb-6 transition-opacity duration-300 opacity-100">
            <h2 className="text-3xl font-bold text-gray-800">Join Us Today</h2>
            <p className="text-gray-600 mt-2">Create your account in just a minute</p>
          </div>

          <form className="space-y-5">
            {/* Name Field */}
            <div className="form-control transition-all duration-300 delay-100">
              <label className="label">
                <span className="label-text text-gray-700 font-medium">Full Name</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="input input-bordered focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Email Field */}
            <div className="form-control transition-all duration-300 delay-150">
              <label className="label">
                <span className="label-text text-gray-700 font-medium">Email Address</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="input input-bordered focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Password Field */}
            <div className="form-control transition-all duration-300 delay-200">
              <label className="label">
                <span className="label-text text-gray-700 font-medium">Password</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="input input-bordered focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Confirm Password Field */}
            <div className="form-control transition-all duration-300 delay-300">
              <label className="label">
                <span className="label-text text-gray-700 font-medium">Confirm Password</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="input input-bordered focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Terms Checkbox */}
            <div className="form-control transition-opacity duration-300 delay-400">
              <label className="label cursor-pointer justify-start gap-3">
                <input type="checkbox" className="checkbox checkbox-primary" required />
                <span className="label-text text-gray-600">
                  I agree to the <a href="#" className="link link-primary">Terms & Conditions</a>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="form-control mt-2 transition-all duration-300 delay-500">
              <button
                type="submit"
                className="btn btn-primary hover:scale-[1.02] active:scale-[0.98] transform transition-transform duration-200 shadow-md hover:shadow-lg"
              >
                Create Account
              </button>
            </div>
          </form>

          {/* Login Link */}
          <div className="text-center mt-6 transition-opacity duration-300 delay-700">
            <p className="text-gray-600">
              Already have an account?{' '}
              <a href="#" className="link link-primary font-semibold">Sign in</a>
            </p>
          </div>

          {/* Social Login */}
          <div className="divider text-gray-500 text-sm my-4 transition-opacity duration-300 delay-800">
            OR CONTINUE WITH
          </div>

          <div className="flex justify-center gap-4 transition-opacity duration-300 delay-900">
            <button className="btn btn-outline btn-circle hover:bg-gray-100">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
              </svg>
            </button>
            <button className="btn btn-outline btn-circle hover:bg-gray-100">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .02c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.99 6.98l-6.99 5.666-6.991-5.666h13.981zm.01 10h-14v-8.505l7 5.673 7-5.672v8.504z"/>
              </svg>
            </button>
            <button className="btn btn-outline btn-circle hover:bg-gray-100">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}