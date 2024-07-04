
import 'package:flutter/material.dart';

class Difficulty extends StatelessWidget {
  final int difficultyLevel;
  final int level;
  const Difficulty({
    required this.difficultyLevel,
    required this.level,
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: SizedBox(
            width: 200,
            child: LinearProgressIndicator(
                value:
                    (difficultyLevel > 0) ? (level / difficultyLevel) / 10 : 1,
                backgroundColor: Colors.white,
                valueColor: const AlwaysStoppedAnimation<Color>(Colors.red)),
          ),
        ),
        Padding(
          padding: const EdgeInsets.all(12.0),
          child: Text('Nível: $level',
              style: const TextStyle(color: Colors.white)),
        ),
      ],
    );
  }
}
