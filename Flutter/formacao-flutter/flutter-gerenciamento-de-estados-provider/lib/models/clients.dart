import 'package:flutter/material.dart';

import 'client.dart';

class Clients extends ChangeNotifier {
  final List<Client> _clients = [];

  List<Client> get clients => List.unmodifiable(_clients);

  Clients({required List<Client> clients}) {
    _clients.addAll(clients);
  }

  void add(Client client) {
    _clients.add(client);
    notifyListeners();
  }

  void remove(Client client) {
    _clients.remove(client);
    notifyListeners();
  }
}
