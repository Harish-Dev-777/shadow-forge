import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    text: v.string(),
    isCompleted: v.boolean(),
  }),
  users: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    businessName: v.optional(v.string()),
    lastContactAt: v.number(),
  }).index("by_email", ["email"]),
  contacts: defineTable({
    name: v.string(),
    email: v.string(),
    service: v.string(),
    budget: v.optional(v.string()),
    phone: v.optional(v.string()),
    details: v.string(),
    businessName: v.optional(v.string()),
    userId: v.optional(v.id("users")),
    timeline: v.optional(v.string()),
  }),
});
