package fr.skym.mrp.config.db.converters

import org.joda.time.LocalDate
import org.springframework.core.convert.converter.Converter

class LocalDateToStringConverter implements Converter<LocalDate, String> {

    @Override
    String convert(LocalDate source) {
        return source.toString()
    }
}
