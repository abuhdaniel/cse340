DROP TABLE IF EXISTS project_category;
DROP TABLE IF EXISTS project;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS organization;

CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(150) NOT NULL,
    project_date DATE NOT NULL,

    CONSTRAINT fk_project_org
        FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
        ON DELETE CASCADE
);

CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE project_category (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,

    PRIMARY KEY (project_id, category_id),

    FOREIGN KEY (project_id)
        REFERENCES project(project_id)
        ON DELETE CASCADE,

    FOREIGN KEY (category_id)
        REFERENCES category(category_id)
        ON DELETE CASCADE
);

----------------------------------------------------------
-- ORGANIZATIONS
----------------------------------------------------------

INSERT INTO organization
(name, description, contact_email, logo_filename)
VALUES
(
'BrightFuture Builders',
'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
'info@brightfuturebuilders.org',
'brightfuture-logo.png'
),
(
'GreenHarvest Growers',
'An urban farming collective promoting food sustainability and education in local neighborhoods.',
'contact@greenharvest.org',
'greenharvest-logo.png'
),
(
'UnityServe Volunteers',
'A volunteer coordination group supporting local charities and service initiatives.',
'hello@unityserve.org',
'unityserve-logo.png'
);

----------------------------------------------------------
-- PROJECTS
----------------------------------------------------------

INSERT INTO project
(
organization_id,
name,
description,
location,
project_date
)
VALUES
(
1,
'Neighborhood Cleanup',
'Cleaning streets and public spaces.',
'Port Harcourt',
'2026-08-15'
),
(
1,
'Bridge Repair',
'Repairing damaged community bridges.',
'Obio-Akpor',
'2026-09-05'
),
(
2,
'Community Garden',
'Creating gardens to provide fresh produce.',
'Port Harcourt',
'2026-08-25'
),
(
2,
'Tree Planting Campaign',
'Planting trees across public schools.',
'Rumuola',
'2026-09-20'
),
(
3,
'Food Drive',
'Collecting food donations for families.',
'Oyigbo',
'2026-08-18'
),
(
3,
'School Tutoring',
'Providing tutoring for local students.',
'Eleme',
'2026-10-02'
);

----------------------------------------------------------
-- CATEGORIES
----------------------------------------------------------

INSERT INTO category
(name)
VALUES
('Environment'),
('Education'),
('Community Service'),
('Infrastructure'),
('Health');

----------------------------------------------------------
-- PROJECT CATEGORIES
----------------------------------------------------------

INSERT INTO project_category
(project_id, category_id)
VALUES
(1,3),
(1,4),
(2,4),
(3,1),
(4,1),
(4,2),
(5,3),
(6,2);