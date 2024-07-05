// ignore_for_file: must_be_immutable

import 'package:flutter/material.dart';

import 'difficulty.dart';

class Task extends StatefulWidget {
  final String name;
  final String photo;
  final int difficulty;

  Task(this.name, this.photo, this.difficulty, {super.key});

  int nivel = 0;

  @override
  State<Task> createState() => _TaskState();
}

class _TaskState extends State<Task> {
  bool assetOrNetWork() {
    if (widget.photo.contains("http") || widget.photo.contains("https")) {
      return false;
    }
    return true;
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Stack(
        children: [
          Container(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(10),
              color: Colors.purple,
            ),
            height: 140,
          ),
          Column(
            children: [
              Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10),
                  color: Colors.white,
                ),
                height: 100,
                child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Container(
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(10),
                          color: Colors.black26,
                        ),
                        width: 72,
                        height: 100,
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(10),
                          child: assetOrNetWork()
                              ? Image.asset(
                                  widget.photo,
                                  fit: BoxFit.cover,
                                )
                              : Image.network(
                                  widget.photo,
                                  fit: BoxFit.cover,
                                ),
                        ),
                      ),
                      Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          SizedBox(
                              width: 200,
                              child: Text(widget.name,
                                  style: const TextStyle(
                                      fontSize: 24,
                                      overflow: TextOverflow.ellipsis))),
                          Row(
                            children: [
                              Icon(
                                Icons.star,
                                size: 15,
                                color: (widget.difficulty >= 1)
                                    ? Colors.purple
                                    : Colors.purple[100],
                              ),
                              Icon(
                                Icons.star,
                                size: 15,
                                color: (widget.difficulty >= 2)
                                    ? Colors.purple
                                    : Colors.purple[100],
                              ),
                              Icon(
                                Icons.star,
                                size: 15,
                                color: (widget.difficulty >= 3)
                                    ? Colors.purple
                                    : Colors.purple[100],
                              ),
                              Icon(
                                Icons.star,
                                size: 15,
                                color: (widget.difficulty >= 4)
                                    ? Colors.purple
                                    : Colors.purple[100],
                              ),
                              Icon(
                                Icons.star,
                                size: 15,
                                color: (widget.difficulty >= 5)
                                    ? Colors.purple
                                    : Colors.purple[100],
                              ),
                            ],
                          ),
                        ],
                      ),
                      SizedBox(
                        width: 52,
                        height: 52,
                        child: ElevatedButton(
                          onPressed: () {
                            setState(() {
                              widget.nivel++;
                            });
                          },
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: const [
                              Icon(Icons.arrow_drop_up),
                              Text("UP", style: TextStyle(fontSize: 10)),
                            ],
                          ),
                        ),
                      )
                    ]),
              ),
              Difficulty(
                  difficultyLevel: widget.difficulty, level: widget.nivel),
            ],
          )
        ],
      ),
    );
  }
}
