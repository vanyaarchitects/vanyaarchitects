-- ==========================================
-- SUPABASE SCHEMA SETUP FOR VANYA ARCHITECTS
-- Copy and paste this script into the Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
-- ==========================================

-- 1. Create Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  area TEXT NOT NULL,
  year TEXT NOT NULL,
  description TEXT,
  "heroImage" TEXT NOT NULL,
  gallery TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Leads Table for Inquiries
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  "projectType" TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Row Level Security (RLS) Configuration
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- 4. Enable Public Read access for Projects (so anyone can view the portfolio)
CREATE POLICY "Allow public read of projects" ON projects
  FOR SELECT USING (true);

-- 5. Enable All operations for Projects (Admin panel publishes/deletes)
CREATE POLICY "Allow all operations for projects" ON projects
  FOR ALL USING (true);

-- 6. Enable Public Write access for Leads (so clients can submit the contact form)
CREATE POLICY "Allow public insert of leads" ON leads
  FOR INSERT WITH CHECK (true);

-- 7. Enable All operations for Leads (so you can view/update status in Admin Panel)
CREATE POLICY "Allow all operations for leads" ON leads
  FOR ALL USING (true);
