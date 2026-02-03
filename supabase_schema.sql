-- Create a table for Courses
CREATE TABLE IF NOT EXISTS courses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  data JSONB NOT NULL, -- The full JSON structure of the course (slides, content)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create a table for Student Progress
CREATE TABLE IF NOT EXISTS student_course_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_slug TEXT NOT NULL,
  current_slide_index INTEGER DEFAULT 0,
  completed_slides JSONB DEFAULT '[]'::jsonb, -- Array of completed slide IDs
  scores JSONB DEFAULT '{}'::jsonb, -- Map of slide_id -> score
  status TEXT DEFAULT 'in_progress', -- 'in_progress', 'completed'
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(student_id, course_slug)
);

-- RLS Policies
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_course_progress ENABLE ROW LEVEL SECURITY;

-- Allow read access to courses for everyone (authenticated)
CREATE POLICY "Courses are viewable by everyone" ON courses FOR SELECT USING (auth.role() = 'authenticated');

-- Allow students to read/write their own progress
CREATE POLICY "Students can view own progress" ON student_course_progress FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Students can update own progress" ON student_course_progress FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Students can update own progress update" ON student_course_progress FOR UPDATE USING (auth.uid() = student_id);

-- Allow admins to view all progress
CREATE POLICY "Admins can view all progress" ON student_course_progress FOR SELECT USING (
  exists (
    select 1 from profiles
    where profiles.id = auth.uid() and profiles.role = 'admin'
  )
);
