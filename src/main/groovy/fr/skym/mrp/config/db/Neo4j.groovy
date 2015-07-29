package fr.skym.mrp.config.db

import org.neo4j.graphdb.GraphDatabaseService
import org.neo4j.graphdb.factory.GraphDatabaseFactory
import org.neo4j.shell.ShellSettings
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.neo4j.config.EnableNeo4jRepositories
import org.springframework.data.neo4j.config.Neo4jConfiguration
import org.springframework.transaction.annotation.EnableTransactionManagement

@Configuration
@EnableTransactionManagement
@EnableNeo4jRepositories(basePackages =  "fr.skym.mrp")
class Neo4j extends Neo4jConfiguration {

    Neo4j() {
        setBasePackage("fr.skym.mrp")
    }

    @Bean
    GraphDatabaseService graphDatabaseService(@Value('${neo4j.shell.port}') String port) {
        return new GraphDatabaseFactory()
                .newEmbeddedDatabaseBuilder("mrp.neo4j.db")
                .setConfig(ShellSettings.remote_shell_enabled, "true")
                .setConfig(ShellSettings.remote_shell_port, port)
                .newGraphDatabase()
    }
}
