
resource "aws_s3_bucket" "dev4" {
  bucket = "jsilverio-dev4"
  acl    = "private"

  tags = {
    Name = "jsilverio-dev4"
  }
}
