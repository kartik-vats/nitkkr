import { relations, sql } from 'drizzle-orm';
import {
  integer,
  pgTable,
  smallint,
  text,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core';

import {
  courseLogs,
  courses,
  departments,
  doctorates,
  persons,
  sections,
  sponsoredResearchProjects,
} from '.';

export const faculty = pgTable(
  'faculty',
  {
    id: integer('id')
      .primaryKey()
      .references(() => persons.id),
    employee_id: varchar('employee_id', { length: 8 }).notNull(),
    designation: varchar('designation').notNull(),
    officeAddress: varchar('college_address', { length: 16 }).notNull(),
    officeTelephone: varchar('office_telephone', { length: 13 }).notNull(),
    homeTelephone: varchar('home_telephone', { length: 13 }),
    departmentId: smallint('department_id')
      .references(() => departments.id)
      .notNull(),
    areasOfInterest: text('areas_of_interest')
      .array()
      .default(sql`'{}'`)
      .notNull(),
    teachingInterests: text('teaching_interests')
      .array()
      .default(sql`'{}'`)
      .notNull(),
    researchInterests: text('research_interests')
      .array()
      .default(sql`'{}'`)
      .notNull(),
    patents: text('patents')
      .array()
      .default(sql`'{}'`)
      .notNull(),
    copyrights: text('copyrights')
      .array()
      .default(sql`'{}'`)
      .notNull(),
    journals: text('journals')
      .array()
      .default(sql`'{}'`)
      .notNull(),
    conferences: text('conferences')
      .array()
      .default(sql`'{}'`)
      .notNull(),
    books: text('books')
      .array()
      .default(sql`'{}'`)
      .notNull(),
    workshops: text('workshops')
      .array()
      .default(sql`'{}'`)
      .notNull(),
    expertLectures: text('expert_lectures')
      .array()
      .default(sql`'{}'`)
      .notNull(),
    awards: text('awards')
      .array()
      .default(sql`'{}'`)
      .notNull(),
    outreach: text('outreach')
      .array()
      .default(sql`'{}'`)
      .notNull(),
    eContent: text('e_content')
      .array()
      .default(sql`'{}'`)
      .notNull(),
    researchProjects: text('research_projects')
      .array()
      .default(sql`'{}'`)
      .notNull(),
    googleScholarId: text('google_scholar_id'),
    orchidId: text('orchid_id'),
    researcherId: text('researcher_id'),
    scopusId: text('scopus_id'),
  },
  (faculty) => {
    return {
      facultyEmployeeIdIndex: uniqueIndex('faculty_employee_id_idx').on(
        faculty.employee_id
      ),
    };
  }
);

export const facultyRelations = relations(faculty, ({ many, one }) => ({
  courseLogs: many(courseLogs),
  courses: many(courses),
  department: one(departments, {
    fields: [faculty.departmentId],
    references: [departments.id],
  }),
  doctorates: many(doctorates),
  sections: many(sections),
  sponsoredResearchProjects: many(sponsoredResearchProjects),
  person: one(persons, {
    fields: [faculty.id],
    references: [persons.id],
  }),
}));
