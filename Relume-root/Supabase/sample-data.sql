-- Sample Products
INSERT INTO products (name, slug, category, subcategory, description, features, specifications, images)
VALUES
  ('Double-Hung Windows', 'double-hung-windows', 'windows', 'double-hung', 'Double-hung windows are a classic choice for any home.', 
   '{"energy_efficient": true, "easy_cleaning": true, "tilt_in_sashes": true}',
   '{"material": "Vinyl", "glass": "Double-pane", "warranty": "Lifetime"}',
   '{"main": "double-hung-main.jpg", "gallery": ["double-hung-1.jpg", "double-hung-2.jpg"]}'),
  
  ('Casement Windows', 'casement-windows', 'windows', 'casement', 'Casement windows offer maximum ventilation and unobstructed views.',
   '{"energy_efficient": true, "easy_operation": true, "maximum_ventilation": true}',
   '{"material": "Vinyl", "glass": "Double-pane", "warranty": "Lifetime"}',
   '{"main": "casement-main.jpg", "gallery": ["casement-1.jpg", "casement-2.jpg"]}'),
  
  ('Entry Doors', 'entry-doors', 'doors', 'entry', 'Make a statement with our beautiful and secure entry doors.',
   '{"energy_efficient": true, "secure": true, "customizable": true}',
   '{"material": "Fiberglass", "core": "Polyurethane foam", "warranty": "Lifetime"}',
   '{"main": "entry-door-main.jpg", "gallery": ["entry-door-1.jpg", "entry-door-2.jpg"]}'),
  
  ('Patio Doors', 'patio-doors', 'doors', 'patio', 'Connect your indoor and outdoor spaces with our stylish patio doors.',
   '{"energy_efficient": true, "smooth_operation": true, "security_features": true}',
   '{"material": "Vinyl", "glass": "Double-pane", "warranty": "Lifetime"}',
   '{"main": "patio-door-main.jpg", "gallery": ["patio-door-1.jpg", "patio-door-2.jpg"]}');

-- Sample Content
INSERT INTO content (page_slug, title, meta_description, content, sections, images)
VALUES
  ('about-us', 'About Windows Doors CA', 'Learn about Windows Doors CA, your trusted provider of windows and doors in California.',
   '{"intro": "Windows Doors CA has been serving California homeowners for over 20 years."}',
   '[{"title": "Our History", "content": "Founded in 2000, Windows Doors CA has grown to become a leader in the industry."}, {"title": "Our Mission", "content": "Our mission is to provide high-quality windows and doors at affordable prices."}]',
   '{"hero": "about-us-hero.jpg", "team": "team.jpg"}'),
  
  ('contact-us', 'Contact Windows Doors CA', 'Get in touch with Windows Doors CA for a free estimate on your windows and doors project.',
   '{"intro": "We\'re here to help with your windows and doors project."}',
   '[{"title": "Contact Information", "content": "Phone: (555) 123-4567\nEmail: info@windowsdoorsca.com"}, {"title": "Office Hours", "content": "Monday-Friday: 8am-5pm\nSaturday: 9am-2pm\nSunday: Closed"}]',
   '{"hero": "contact-us-hero.jpg", "office": "office.jpg"}');

-- Sample Testimonials
INSERT INTO testimonials (customer_name, location, testimonial, rating, services, approved)
VALUES
  ('John Smith', 'Los Angeles, CA', 'Windows Doors CA did an amazing job replacing all the windows in my home. The process was smooth from start to finish.', 5, '{"windows"}', true),
  ('Jane Doe', 'San Diego, CA', 'I love my new entry door! It looks beautiful and has improved the energy efficiency of my home.', 5, '{"doors"}', true),
  ('Bob Johnson', 'San Francisco, CA', 'The team at Windows Doors CA was professional and efficient. They replaced all my windows in just one day!', 4, '{"windows"}', true);

-- Sample Gallery Items
INSERT INTO gallery (project_type, location, description, images)
VALUES
  ('windows', 'Los Angeles, CA', 'Complete window replacement for a 3-bedroom home in Los Angeles.',
   '{"main": "la-windows-main.jpg", "gallery": ["la-windows-1.jpg", "la-windows-2.jpg", "la-windows-3.jpg"]}'),
  
  ('doors', 'San Diego, CA', 'Entry door and patio door replacement for a home in San Diego.',
   '{"main": "sd-doors-main.jpg", "gallery": ["sd-doors-1.jpg", "sd-doors-2.jpg"]}');

-- Sample Service Areas
INSERT INTO service_areas (city, county, state, zip, available)
VALUES
  ('Los Angeles', 'Los Angeles', 'CA', '90001', true),
  ('San Diego', 'San Diego', 'CA', '92101', true),
  ('San Francisco', 'San Francisco', 'CA', '94101', true),
  ('Sacramento', 'Sacramento', 'CA', '95814', true),
  ('Fresno', 'Fresno', 'CA', '93706', true);
