import { NextRequest, NextResponse } from 'next/server';
import { RateLimitError } from '../errors/AppError';

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

export class RateLimiter {
  private static store = new Map<string, RateLimitEntry>();
  private static readonly MAX_REQUESTS = 100;
  private static readonly WINDOW_MS = 15 * 60 * 1000;

  static check(request: NextRequest): void {
    const identifier = this.getIdentifier(request);
    const now = Date.now();
    const entry = this.store.get(identifier);

    if (!entry || now > entry.resetTime) {
      this.store.set(identifier, {
        count: 1,
        resetTime: now + this.WINDOW_MS,
      });
      return;
    }

    if (entry.count >= this.MAX_REQUESTS) {
      const resetIn = Math.ceil((entry.resetTime - now) / 1000);
      throw new RateLimitError(
        `Rate limit exceeded. Try again in ${resetIn} seconds.`
      );
    }

    entry.count++;
  }

  static getHeaders(request: NextRequest): Record<string, string> {
    const identifier = this.getIdentifier(request);
    const entry = this.store.get(identifier);

    if (!entry) {
      return {
        'X-RateLimit-Limit': this.MAX_REQUESTS.toString(),
        'X-RateLimit-Remaining': this.MAX_REQUESTS.toString(),
        'X-RateLimit-Reset': new Date(Date.now() + this.WINDOW_MS).toISOString(),
      };
    }

    const remaining = Math.max(0, this.MAX_REQUESTS - entry.count);
    return {
      'X-RateLimit-Limit': this.MAX_REQUESTS.toString(),
      'X-RateLimit-Remaining': remaining.toString(),
      'X-RateLimit-Reset': new Date(entry.resetTime).toISOString(),
    };
  }

  private static getIdentifier(request: NextRequest): string {
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
    return ip;
  }

  static cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.store.entries()) {
      if (now > entry.resetTime) {
        this.store.delete(key);
      }
    }
  }
}

setInterval(() => RateLimiter.cleanup(), 10 * 60 * 1000);