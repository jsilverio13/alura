terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.27"
    }
  }

  required_version = ">= 0.14.9"
}

provider "aws" {
  profile = "default"
  region  = "us-west-2"
}

provider "aws" {
  alias = "us-east-2"
  profile = "default"
  region  = "us-east-2"
}


resource "aws_instance" "access" {
  count = 3
  ami = var.amis.us-west-2
  instance_type = var.type_instance.t2_micro
  key_name = var.key_name.oregon
  tags = {
    Name = "Terraform Intro ${count.index + 1}"
  }

  vpc_security_group_ids = ["${aws_security_group.acesso-ssh.id}"]
}

resource "aws_instance" "dev4" {
  ami = var.amis.us-west-2
  instance_type = var.type_instance.t2_micro
  key_name = var.key_name.oregon
  tags = {
    Name = "Terraform Intro 4"
  }

  vpc_security_group_ids = ["${aws_security_group.acesso-ssh.id}"]
  depends_on = [
    aws_s3_bucket.dev4
  ]
}

resource "aws_instance" "dev5" {
  ami = var.amis.us-west-2
  instance_type = var.type_instance.t2_micro
  key_name = var.key_name.oregon
  tags = {
    Name = "Terraform Intro 5"
  }

  vpc_security_group_ids = ["${aws_security_group.acesso-ssh.id}"]
}

resource "aws_instance" "dev6" {
  provider = aws.us-east-2
  ami = var.amis.us-east-2
  instance_type = var.type_instance.t2_micro
  key_name = var.key_name.ohio
  tags = {
    Name = "Terraform Intro 6"
  }
  vpc_security_group_ids = ["${aws_security_group.acesso-ssh-us-east-2.id}"]
  depends_on = [
    aws_dynamodb_table.dynamodb-homologacao
  ]
}


resource "aws_instance" "dev7" {
  provider = aws.us-east-2
  ami = var.amis.us-east-2
  instance_type = var.type_instance.t2_micro
  key_name = var.key_name.ohio
  tags = {
    Name = "Terraform Intro 7"
  }
}