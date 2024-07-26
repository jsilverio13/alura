import 'package:estilizacao_componentes/components/box_card.dart';
import 'package:estilizacao_componentes/data/bank_http.mocks.dart';
import 'package:estilizacao_componentes/data/bank_inherited.dart';
import 'package:estilizacao_componentes/screens/home.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/mockito.dart';

void main() {
  final MockBankHttp httpMock = MockBankHttp();
  testWidgets('My widget has a text "Spent"', (tester) async {
    when(httpMock.dolarToReal()).thenAnswer((_) async => '5.0');
    await tester.pumpWidget(MaterialApp(
      home: BankInherited(
        child: Home(api: httpMock.dolarToReal()),
      ),
    ));
    final finder = find.text('Spent');

    expect(finder, findsOneWidget);
  });

  testWidgets('finder a LinearProgressIndicator', (tester) async {
    when(httpMock.dolarToReal()).thenAnswer((_) async => '5.0');
    await tester.pumpWidget(MaterialApp(
      home: BankInherited(
        child: Home(api: httpMock.dolarToReal()),
      ),
    ));
    final finder = find.byType(LinearProgressIndicator);

    expect(finder, findsOneWidget);
  });

  testWidgets('finder a Account Status', (tester) async {
    when(httpMock.dolarToReal()).thenAnswer((_) async => '5.0');
    await tester.pumpWidget(MaterialApp(
      home: BankInherited(
        child: Home(api: httpMock.dolarToReal()),
      ),
    ));
    final finder = find.byKey(const Key('testKey'));

    expect(finder, findsOneWidget);
  });

  testWidgets('finds 5 BoxCards', (tester) async {
    when(httpMock.dolarToReal()).thenAnswer((_) async => '5.0');
    await tester.pumpWidget(MaterialApp(
      home: BankInherited(
        child: Home(api: httpMock.dolarToReal()),
      ),
    ));
    final finder = find.byWidgetPredicate((widget) {
      if (widget is BoxCard) {
        return true;
      }
      return false;
    });

    expect(finder, findsNWidgets(5));
  });

  testWidgets('When tap Deposit should upload earned in 10', (tester) async {
    when(httpMock.dolarToReal()).thenAnswer((_) async => '5.0');
    await tester.pumpWidget(MaterialApp(
      home: BankInherited(
        child: Home(api: httpMock.dolarToReal()),
      ),
    ));

    final deposit = find.text(('Deposit'));
    await tester.tap(deposit);

    final earned = find.text('Earned');
    await tester.tap(earned);

    await tester.pump();

    expect(find.text('\$10.0'), findsOneWidget);
  });

  testWidgets('Testing MockHttp  dolar to Real', (tester) async {
    when(httpMock.dolarToReal()).thenAnswer((_) async => '5.0');

    await tester.pumpWidget(MaterialApp(
      home: BankInherited(
        child: Home(api: httpMock.dolarToReal()),
      ),
    ));

    verify(httpMock.dolarToReal()).called(6);
  });
}
