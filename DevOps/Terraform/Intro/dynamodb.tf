resource "aws_dynamodb_table" "dynamodb-homologacao" {
    provider = aws.us-east-2
    name = "GameScores"
    billing_mode = "PAY_PER_REQUEST"  
    read_capacity = 20
    write_capacity = 20
    hash_key = "UserId"
    range_key = "GameTitle"

    attribute {
      name = "UserId"
      type = "S"
    }

    attribute {
      name = "GameTitle"
      type = "S"
    }

}