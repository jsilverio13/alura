import 'dart:convert';
import 'dart:io';

import 'package:flutter_webapi_first_course/services/webclient.dart';
import 'package:http/http.dart' as http;

import '../models/journal.dart';

class JournalService {
  String url = WebClient.url;
  http.Client client = WebClient().client;
  static const String resource = "journals/";

  String getUrl() {
    return url + resource;
  }

  Future<bool> register(Journal journal, {required String token}) async {
    String jsonJournal = json.encode(journal.toMap());
    var response = await client.post(
      Uri.parse(getUrl()),
      headers: {'Content-Type': 'application/json', 'Authorization': "Bearer $token"},
      body: jsonJournal,
    );

    if (response.statusCode != 201 || response.statusCode != 200) {
      if (json.decode(response.body) == "jwt expired") {
        throw TokenNotValidException();
      }

      throw HttpException(response.body);
    }

    return true;
  }

  Future<bool> edit(String id, Journal journal, {required String token}) async {
    journal.updatedAt = DateTime.now();
    String jsonJournal = json.encode(journal.toMap());
    var response = await client.put(
      Uri.parse("${getUrl()}$id"),
      headers: {'Content-Type': 'application/json', 'Authorization': "Bearer $token"},
      body: jsonJournal,
    );

    if (response.statusCode != 201 || response.statusCode != 200) {
      if (json.decode(response.body) == "jwt expired") {
        throw TokenNotValidException();
      }

      throw HttpException(response.body);
    }

    return true;
  }

  Future<List<Journal>> getAll({required String id, required String token}) async {
    http.Response response = await client.get(
      Uri.parse("${url}users/$id/journals"),
      headers: {'Content-Type': 'application/json', 'Authorization': "Bearer $token"},
    );

    if (response.statusCode != 200) {
      if (json.decode(response.body) == "jwt expired") {
        throw TokenNotValidException();
      }

      throw HttpException(response.body);
    }

    List<Journal> list = [];

    List<dynamic> listDynamic = json.decode(response.body);

    for (var jsonMap in listDynamic) {
      list.add(Journal.fromMap(jsonMap));
    }

    return list;
  }

  Future<bool> delete(String id, {required String token}) async {
    http.Response response = await http.delete(
      Uri.parse("${getUrl()}$id"),
      headers: {'Content-Type': 'application/json', 'Authorization': "Bearer $token"},
    );

    if (response.statusCode != 200) {
      if (json.decode(response.body) == "jwt expired") {
        throw TokenNotValidException();
      }

      throw HttpException(response.body);
    }

    return true;
  }
}

class TokenNotValidException implements Exception {}
