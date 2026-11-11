import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

export const collections = {
  blog: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
    schema: z.object({
      title: z.string(),
      slug: z.string(),
      date: z.string().or(z.date()).optional(),
      category: z.string().optional(),
      summary: z.string().optional(),
      status: z.string().optional(),
      tags: z.array(z.string()).optional(),
      type: z.string().optional(),
    }),
  }),
  projects: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
    schema: z.object({
      title: z.string(),
      slug: z.string(),
      date: z.string().or(z.date()).optional(),
      category: z.string().optional(),
      summary: z.string().optional(),
      projectStatus: z.string().optional(),
      authors: z.string().optional(),
      status: z.string().optional(),
      gitlab: z.string().optional(),
      github: z.string().optional(),
      useReadme: z.boolean().optional(),
    }),
  }),
  models: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/models' }),
    schema: z.object({
      title: z.string(),
      slug: z.string(),
      date: z.string().or(z.date()).optional(),
      category: z.string().optional(),
      image: z.string().optional(),
      tags: z.array(z.string()).optional(),
      license: z.string().optional(),
      printables: z.string().optional(),
      status: z.string().optional(),
    }),
  }),
  recipes: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/recipes' }),
    schema: z.object({
      title: z.string(),
      slug: z.string(),
      date: z.string().or(z.date()).optional(),
      category: z.string().optional(),
      recipeTag: z.string().optional(),
      recipeTime: z.string().optional(),
      summary: z.string().optional(),
      status: z.string().optional(),
    }),
  }),
  pages: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
    schema: z.object({
      title: z.string(),
      slug: z.string(),
      date: z.string().or(z.date()).optional(),
      category: z.string().optional(),
      status: z.string().optional(),
      save_as: z.string().optional(),
      template: z.string().optional(),
      type: z.string().optional(),
    }),
  }),
};
