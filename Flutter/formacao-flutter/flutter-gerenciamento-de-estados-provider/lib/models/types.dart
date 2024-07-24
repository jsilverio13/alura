import 'package:client_control/models/client_type.dart';
import 'package:flutter/material.dart';

class Types extends ChangeNotifier {
  final List<ClientType> _types = [];

  List<ClientType> get types => List.unmodifiable(_types);

  Types({required List<ClientType> types}) {
    _types.addAll(types);
  }

  void add(ClientType type) {
    _types.add(type);
    notifyListeners();
  }

  void remove(ClientType type) {
    _types.remove(type);
    notifyListeners();
  }
}
