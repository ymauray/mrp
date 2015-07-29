package fr.skym.mrp.config.db.converters

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.convert.ConversionService
import org.springframework.core.convert.support.DefaultConversionService

@Configuration
class ConversionServiceConfiguration {

    @Bean
    ConversionService conversionService() {
        def service = new DefaultConversionService()
        service.addConverter(new LocalDateToStringConverter());
        service.addConverter(new StringToLocalDateConverter());
        return service
    }

}
