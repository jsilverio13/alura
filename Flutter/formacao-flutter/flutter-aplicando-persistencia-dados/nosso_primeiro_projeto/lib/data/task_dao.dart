import 'package:flutter/foundation.dart';
import 'package:sqflite/sqflite.dart';

import '../components/task.dart';
import 'database.dart';

class TaskDao {
  static const String tableSql = 'CREATE TABLE '
      '$_tablename('
      'id INTEGER PRIMARY KEY, '
      '$_name TEXT, '
      '$_difficulty INTEGER, '
      '$_image TEXT)';

  static const String _tablename = 'taskTable';
  static const String _name = "name";
  static const String _difficulty = "difficulty";
  static const String _image = "image";

  save(Task task) async {
    if (kDebugMode) {
      print('Iniciando o save: ');
    }
    final Database db = await getDatabase();
    Map<String, dynamic> taskMap = _toMap(task);
    var itemExists = await find(task.name);

    if (itemExists.isEmpty) {
      return db.insert(_tablename, taskMap);
    } else {
      return db.update(
        _tablename,
        taskMap,
        where: '$_name = ?',
        whereArgs: [task.name],
      );
    }
  }

  Future<List<Task>> findAll() async {
    if (kDebugMode) {
      print('Acessando o findAll: ');
    }
    final Database db = await getDatabase();
    final List<Map<String, dynamic>> result = await db.query(_tablename);
    List<Task> tasks = _toList(result);
    return tasks;
  }

  Future<List<Task>> find(String name) async {
    if (kDebugMode) {
      print('Acessando find: $name');
    }
    final Database db = await getDatabase();
    final List<Map<String, dynamic>> result = await db.query(
      _tablename,
      where: '$_name = ?',
      whereArgs: [name],
    );
    return _toList(result);
  }

  delete(String name) async {
    if (kDebugMode) {
      print('Deletando tarefa: $name');
    }
    final Database db = await getDatabase();
    return db.delete(
      _tablename,
      where: '$_name = ?',
      whereArgs: [name],
    );
  }

  _toList(List<Map<String, dynamic>> result) {
    if (kDebugMode) {
      print('Convertendo to List:');
    }
    final List<Task> tasks = [];
    for (Map<String, dynamic> row in result) {
      final Task task = Task(
        row[_name],
        row[_image],
        row[_difficulty],
      );
      tasks.add(task);
    }
    return tasks;
  }

  _toMap(Task task) {
    if (kDebugMode) {
      print('Convertendo to Map: ');
    }
    final Map<String, dynamic> taskMap = {};
    taskMap[_name] = task.name;
    taskMap[_difficulty] = task.difficulty;
    taskMap[_image] = task.image;
    return taskMap;
  }
}
