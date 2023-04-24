create database "TODOLIST";
create table tarefas (
    codigo serial primary key,
    titulo varchar(40) not null
)

insert into tarefas (titulo) values ('Ir ao Supermercado');
insert into tarefas (titulo) values ('Fazer tarefa de casa');