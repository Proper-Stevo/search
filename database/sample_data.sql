-- Insert sample contacts for testing search functionality
INSERT INTO contacts (first_name, last_name, email, phone, company, job_title, notes, tags, is_favorite) VALUES
('John', 'Doe', 'john.doe@email.com', '555-0101', 'Tech Corp', 'Software Engineer', 'Great developer, works on React projects', 'work,developer,react', true),
('Jane', 'Smith', 'jane.smith@gmail.com', '555-0102', 'Design Studio', 'UX Designer', 'Excellent at user research and prototyping', 'work,design,client', false),
('Mike', 'Johnson', 'mike.j@company.com', '555-0103', 'Sales Inc', 'Sales Manager', 'Top performer, handles enterprise accounts', 'work,sales,enterprise', true),
('Sarah', 'Wilson', 'sarah.wilson@startup.io', '555-0104', 'AI Startup', 'Product Manager', 'Leading AI product development', 'work,ai,product', false),
('David', 'Brown', 'david.brown@freelance.com', '555-0105', 'Freelancer', 'Graphic Designer', 'Available for logo and branding projects', 'freelance,design,branding', false),
('Emily', 'Davis', 'emily.davis@tech.com', '555-0106', 'Tech Corp', 'DevOps Engineer', 'Kubernetes and AWS expert', 'work,devops,aws', true),
('Robert', 'Miller', 'rob.miller@consulting.com', '555-0107', 'Miller Consulting', 'Business Consultant', 'Specializes in digital transformation', 'consultant,business,digital', false),
('Lisa', 'Garcia', 'lisa.garcia@marketing.com', '555-0108', 'Marketing Pro', 'Marketing Director', 'SEO and content marketing specialist', 'work,marketing,seo', false),
('James', 'Martinez', 'james.m@legal.com', '555-0109', 'Law Firm LLC', 'Attorney', 'Corporate law and contracts', 'legal,corporate,contracts', false),
('Amy', 'Anderson', 'amy.anderson@health.com', '555-0110', 'HealthTech', 'Data Scientist', 'Healthcare analytics and ML', 'work,healthcare,ml,data', true),
('Tom', 'White', 'tom.white@media.com', '555-0111', 'Media Group', 'Video Editor', 'Motion graphics and post-production', 'media,video,creative', false),
('Jennifer', 'Taylor', 'jen.taylor@nonprofit.org', '555-0112', 'Community Foundation', 'Program Director', 'Community outreach and grant writing', 'nonprofit,community,grants', false);

-- Verify the data was inserted and search vectors were created
SELECT 
    first_name, 
    last_name, 
    company, 
    LENGTH(search_vector::text) as search_vector_length 
FROM contacts 
LIMIT 5;