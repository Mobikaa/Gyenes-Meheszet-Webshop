INSERT INTO products
(name, category_id, quantity, price, weight, description, picture)
VALUES
-- Méhészeti eszközök (1)
('Méhészeti füstölő', 1, 15, 12990, 0.500, 'Rozsdamentes acél füstölő méhek nyugtatásához', 'smoker.jpg'),
('Méhészkesztyű', 1, 25, 7990, 0.200, 'Bőr méhészkesztyű a biztonságos munkához', 'gloves.jpg'),
('Méhészeti tálca', 1, 30, 14990, 2.500, 'Fa tálca keretekhez', 'tray.jpg'),
('Méhkeret', 1, 50, 2490, 0.800, 'Standard méhkeret méhcsaládokhoz', 'frame.jpg'),

-- Méhészeti ruházat (2)
('Méhészeti overál', 2, 20, 34990, 1.500, 'Teljes testet védő méhészeti overál', 'overall.jpg'),
('Méhészeti kalap hálóval', 2, 30, 12990, 0.300, 'Kalap és háló a fej védelmére', 'hat_net.jpg'),
('Méhészeti csizma', 2, 15, 17990, 1.200, 'Vízálló csizma a biztonságos munkához', 'boots.jpg'),

-- Méhészeti kiegészítők (3)
('Méhészkendő', 3, 40, 4990, 0.100, 'Pamut kendő fejvédelemhez', 'scarf.jpg'),
('Méhészkapocs', 3, 100, 990, 0.050, 'Keretek rögzítéséhez', 'clip.jpg'),
('Méhészeti csipesz', 3, 60, 1490, 0.150, 'Keretek és kaptár alkatrészek kezeléséhez', 'tweezers.jpg'),
('Méhészeti mérleg', 3, 10, 29990, 2.000, 'Pontosság a termeléshez', 'scale.jpg'),

-- Méhészeti könyvek (4)
('Méhészet kezdőknek', 4, 50, 4990, 0.800, 'Kezdő méhészeknek szóló útmutató', 'book1.jpg'),
('Méhészet haladóknak', 4, 30, 7990, 1.000, 'Haladó technikák és tippek', 'book2.jpg'),
('Méhészet és biológia', 4, 20, 6990, 1.200, 'Méhészet tudományos megközelítéssel', 'book3.jpg'),

-- Mézek és termékek (5)
('Akácméz 500g', 5, 100, 3490, 0.500, 'Természetes akácméz', 'acacia_honey.jpg'),
('Vegyes virágméz 500g', 5, 80, 3290, 0.500, 'Vegyes virágokból származó méz', 'flower_honey.jpg'),
('Méhviasz lapok', 5, 40, 2990, 0.700, 'Saját méhészeknek, gyertyagyártáshoz', 'wax_sheets.jpg'),
('Propolisz csepp', 5, 60, 4990, 0.100, 'Immunerősítő propolisz', 'propolis.jpg');
