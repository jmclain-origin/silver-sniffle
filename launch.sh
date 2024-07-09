#!/bin/bash

# echo "Creating production ready application server"

# sleep 2

# clear

# echo "checking dependencies"

# sleep 1

# clear

# echo "bundling app build output into docker image"

# docker build -t sms-api:latest --no-cache .

# printf "\rsuccessfully built docker image"

# echo "stating docker container"

# sleep 1

# docker rm -v sms-server-api

# docker run -d -p 8080:8080 --name sms-server-api sms-api:latest

# # printf "run cmd:\n\tdocker run -d -p 8080:8080 -name sms-server-api sms-api:latest\n"

# sleep 3

# exit 0



# Function to display the menu
show_menu() {
    echo "Docker made easy"
    sleep 2
    echo "Please select one of the following options:"
    echo "1) Build docker image"
    echo "2) Remove container"
    echo "3) Create and run deattched container"
    echo "4) Stop container"
    echo "5) Exit"
}

build_image() {
  echo "Building docker image"
  sleep 1
  docker build -t sms-api:latest --no-cache .
}
remove_container() {
  echo "Removing old container"
  sleep 1
  docker rm -v sms-server-api
}
start_container() {
  echo "Starting deattached container"
  sleep 1
  docker run -d -p 8080:8080 --name sms-server-api sms-api:latest
}
stop_container() {
    echo "stopping container"
    docker stop sms-server-api
}


# Function to execute the selected command
execute_command() {
    case $1 in
        1)
            build_image
            ;;
        2)
            remove_container
            ;;
        3)
            start_container
            ;;
        4)
            echo "Exiting..."
            exit 0
            ;;
        5)
            stop_container
            ;;
        *)
            echo "Invalid option. Please try again."
            ;;
    esac
}



# Main loop
while true; do
    show_menu
    read -p "Enter your choice then press enter[1-5]: " choice
    execute_command $choice
    echo
done

