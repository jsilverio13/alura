variable "amis" {
  type = map(string)

  default = {
      "us-west-2" = "ami-03d5c68bab01f3496"
      "us-east-2" = "ami-00dfe2c7ce89a450b"
  }
}

variable "cdirs_acesso_remoto" {
  type = list(string)
  default = [ "191.32.154.79/32","191.32.154.79/32" ]
}

variable "key_name" {
    type = map(string)
    default = {
      "oregon" = "jsilverio-oregon"
      "ohio" = "jsilverio-ohio"
    }
}

variable "type_instance" {
    type = map(string)
    default = {
      "t2_micro" = "t2.micro"
    }
}