create table if not exists
  Users (
    id bigint primary key generated always as identity,
    first_name text not null,
    last_name text not null,
    email text not null unique,
    college text not null,
    github_username text not null,
    inputted_interests text,
    analyzed_keywords text
  );

create table if not exists
  Projects (
    id bigint primary key generated always as identity,
    project_owner_id bigint not null,
    time_posted timestamp with time zone not null default current_timestamp,
    project_title text not null,
    project_description text not null,
    project_link text not null,
    project_keywords text,
    foreign key (project_owner_id) references Users (id) on delete cascade
  );

create table if not exists
  InterestedProjects (
    id bigint primary key generated always as identity,
    user_id bigint not null,
    project_id bigint not null,
    foreign key (user_id) references Users (id) on delete cascade,
    foreign key (project_id) references Projects (id) on delete cascade
  );

create table if not exists
  AcceptedProjects (
    id bigint primary key generated always as identity,
    user_id bigint not null,
    project_id bigint not null,
    foreign key (user_id) references Users (id) on delete cascade,
    foreign key (project_id) references Projects (id) on delete cascade
  );

create table if not exists
  RejectedProjects (
    id bigint primary key generated always as identity,
    user_id bigint not null,
    project_id bigint not null,
    foreign key (user_id) references Users (id) on delete cascade,
    foreign key (project_id) references Projects (id) on delete cascade
  );

create table if not exists
  Notifications (
    notification_id bigint primary key generated always as identity,
    user_id bigint not null,
    time_stamp timestamp with time zone not null default current_timestamp,
    message text not null,
    foreign key (user_id) references Users (id) on delete cascade
  );