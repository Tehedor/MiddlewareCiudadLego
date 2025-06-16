

##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
##### ##### ##### ##### Orion LD
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####


getHeartbeat(){
	eval "response=$(docker run --network fiware_default --rm quay.io/curl/curl:8.4.0 -s -o /dev/null -w "%{http_code}" "$1")"
}

waitForOrion () {
	echo -e "\n⏳ Waiting for \033[1;34mOrion-LD\033[0m to be available\n"
	
	while ! [ `docker inspect --format='{{.State.Health.Status}}' fiware-orion` == "healthy" ]
	do
		echo -e "\nContext Broker HTTP state: ${response} (waiting for 200)"
		pause 6
		echo ${ORION}
		getHeartbeat "${ORION}"
	done
}

waitForCoreContext () {
	echo -e "\n⏳ Checking availability of \033[1m core @context\033[0m from ETSI\n"
	eval "response=$(docker run --rm quay.io/curl/curl:8.4.0 -s -o /dev/null -w "%{http_code}" "$CORE_CONTEXT")"
	while [ "${response}" -eq 000 ]
	do
		echo -e "\n@context HTTP state: ${response} (waiting for 200)"
		pause 3
		eval "response=$(docker run --rm quay.io/curl/curl:8.4.0 -s -o /dev/null -w "%{http_code}" "$CORE_CONTEXT")"
	done
}

waitForUserContext () {
	echo -e "\n⏳ Waiting for user \033[1m@context\033[0m to be available\n"
	getHeartbeat "${CONTEXT}"
	while [ "${response}" -eq 000 ]
	do
		echo -e "\n@context HTTP state: ${response} (waiting for 200)"
		pause 3
		getHeartbeat "${CONTEXT}"
	done
}

waitForMongoOrion () {
	echo -e "\n⏳ Waiting for \033[1mMongoDB Orion\033[0m to be available\n"
	while ! [ `docker inspect --format='{{.State.Health.Status}}' mongo-db-orion` == "healthy" ]
	do 
		sleep 1
	done
}


stoppingContainersOrion () {
	CONTAINERS=$(docker ps --filter "label=org.fiware=orion" -aq)
	if [[ -n $CONTAINERS ]]; then 
		echo "Stopping containers"
		docker rm -f $CONTAINERS || true
	fi
	VOLUMES=$(docker volume ls -qf "label=org.fiware=orion") 
	if [[ -n $VOLUMES ]]; then 
		echo "Removing old volumes"
		docker volume rm $VOLUMES || true
	fi
	NETWORKS=$(docker network ls  --filter "label=org.fiware=orion" -q) 
	if [[ -n $NETWORKS ]]; then 
		echo "Removing orion networks"
		docker network rm $NETWORKS || true
	fi
}

##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
##### ##### ##### ##### Draco
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####

# Draco
stoppingContainersDraco () {
	CONTAINERS=$(docker ps --filter "label=org.fiware=draco" -aq)
	if [[ -n $CONTAINERS ]]; then 
		echo "Stopping containers"
		docker rm -f $CONTAINERS || true
	fi
	VOLUMES=$(docker volume ls -qf "label=org.fiware=draco") 
	if [[ -n $VOLUMES ]]; then 
		echo "Removing old volumes"
		docker volume rm $VOLUMES || true
	fi
	NETWORKS=$(docker network ls  --filter "label=org.fiware=draco" -q) 
	if [[ -n $NETWORKS ]]; then 
		echo "Removing draco networks"
		docker network rm $NETWORKS || true
	fi
}

waitForDraco () {
	echo -e "\n⏳ Waiting for \033[1;34mDraco\033[0m to be available\n"

	while ! [ `docker inspect --format='{{.State.Health.Status}}' draco` == "healthy" ]
	do
		sleep 1
	done
}

# BD
waitForMysql () {
	echo -e "\n⏳ Waiting for \033[1mMySQL draco\033[0m to be available\n"
	while ! [ `docker inspect --format='{{.State.Health.Status}}' db-mysql-draco` == "healthy" ]
	do 
		sleep 1
	done
}

waitForMongoDraco () {
	echo -e "\n⏳ Waiting for \033[1mMongoDB Draco\033[0m to be available\n"
	# while ! [ `docker inspect --format='{{.State.Health.Status}}' db-mongo` == "healthy" ]
	while ! [ `docker inspect --format='{{.State.Health.Status}}' mongo-db-draco` == "healthy" ]
	do 
		sleep 1
	done
}

waitForPostgres () {
	echo -e "\n⏳ Waiting for \033[1mPostgreSQL\033[0m to be available\n"
	while ! [ `docker inspect --format='{{.State.Health.Status}}' db-postgres-draco` == "healthy" ]
	do 
		sleep 1
	done
}


waitForDracoInit() {
  echo -e "\n⏳ Esperando a que \033[1mDraco Init\033[0m termine..."

  while docker ps -a --format '{{.Names}}' | grep -q "^fiware-draco-init-1$"; do
    status=$(docker inspect --format='{{.State.Status}}' fiware-draco-init-1 2>/dev/null)

    if [ "$status" = "exited" ]; then
      exit_code=$(docker inspect --format='{{.State.ExitCode}}' fiware-draco-init-1)
      if [ "$exit_code" -eq 0 ]; then
        echo -e "\n✅ \033[1mDraco Init finalizado correctamente\033[0m"
      else
        echo -e "\n❌ \033[1mDraco Init terminó con errores (exit code $exit_code)\033[0m"
      fi
      break
    fi

    echo -n "."
    sleep 1
  done

  echo -e "\n🧹 Eliminando contenedor fiware-draco-init-1"
}


##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
##### ##### ##### ##### Simulator
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####

stoppingContainerAppSimulator() {
	CONTAINERS=$(docker ps --filter "name=simulator-app" -aq)
	if [[ -n $CONTAINERS ]]; then 
		echo "Stopping containers"
		docker rm -f $CONTAINERS || true
	fi
}


waitForSimulatorApp() {
	echo -e "\n⏳ Waiting for \033[1mSimulator App\033[0m to be available\n"

	while ! [ `docker inspect --format='{{.State.Health.Status}}' simulator-app` == "healthy" ]
	do 
		sleep 1
	done
}

##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
##### ##### ##### ##### subs-control-app
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####

stoppingContainerAppSubsControl() {
	CONTAINERS=$(docker ps --filter "name=subs-control-app" -aq)
	if [[ -n $CONTAINERS ]]; then 
		echo "Stopping containers"
		docker rm -f $CONTAINERS || true
	fi
}


waitForSubsControlApp() {

	echo -e "\n⏳ Waiting for \033[1mSubs Control App\033[0m to be available\n"

	while ! [ `docker inspect --format='{{.State.Health.Status}}' subs-control-app` == "healthy" ]
	do 
		sleep 1
	done
}

##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
##### ##### ##### ##### miniobucket
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####

stoppingContainerMinioBucket() {
	CONTAINERS=$(docker ps --filter "name=minio-bucket" -aq)
	if [[ -n $CONTAINERS ]]; then 
		echo "Stopping containers"
		docker rm -f $CONTAINERS || true
	fi
}


waitForMinioBucket() {

	echo -e "\n⏳ Waiting for \033[1mMinio Bucket \033[0m to be available\n"

	while ! [ `docker inspect --format='{{.State.Health.Status}}' minio-bucket` == "healthy" ]
	do 
		sleep 1
	done
}

##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
##### ##### ##### ##### proxy-reverse
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####

# stoppingContainerAppSubsControl() {
# 	CONTAINERS=$(docker ps --filter "name=subs-control-app" -aq)
# 	if [[ -n $CONTAINERS ]]; then 
# 		echo "Stopping containers"
# 		docker rm -f $CONTAINERS || true
# 	fi
# }
stoppingContainerProxyReverse() {
	${dockerCmd} -f proxy-reverse/nginx-reverse.yml  down
	# CONTAINERS=$(docker ps --filter "name=nginx-reverse" -aq)
	# if [[ -n $CONTAINERS ]]; then 
	# 	echo "Stopping containers"
	# 	docker rm -f $CONTAINERS || true
	# fi
}

waitForProxyReverse() {
	echo -e "\n⏳ Waiting for \033[1mProxy Reverse\033[0m to be available\n"
	while ! [ `docker inspect --format='{{.State.Health.Status}}' nginx-reverse-container` == "healthy" ]
	do 
		sleep 1
	done
}



##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
##### ##### ##### ##### ApisApp
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####

stopContainerApisApp() {
	CONTAINERS=$(docker ps --filter "name=apis-app" -aq)
	if [[ -n $CONTAINERS ]]; then 
		echo "Stopping containers"
		docker rm -f $CONTAINERS || true
	fi
}

waitForApisApp() {
	echo -e "\n⏳ Waiting for \033[1mApis App\033[0m to be available\n"

	while ! [ `docker inspect --format='{{.State.Health.Status}}' apis-app` == "healthy" ]
	do 
		sleep 1
	done
}