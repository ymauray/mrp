/*
 *     MediaPlanner
 *     Copyright (C) 2015  Yannick Mauray
 *
 *     This program is free software; you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation; either version 2 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License along
 *     with this program; if not, write to the Free Software Foundation, Inc.,
 *     51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

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
@EnableTransactionManagement(proxyTargetClass = true)
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
