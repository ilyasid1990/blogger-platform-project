import { type Request, type Response } from 'express';
import { type BlogInputDto } from '../../dto/blog.input.dto.js';
import { HttpStatus } from '../../../core/constants/http-statuses.js';
import { type Blog } from '../../types/blog.js';
import { blogsRepository } from '../../repositories/blogs.repository.js';
import { mapToBlogViewModel } from '../mappers/map-to-blog-view-model.util.js';
import { mapBlogInputDtoToBlog } from '../mappers/map-blog-input-dto-to-blog.util.js';

export async function createDriverHandler(
  req: Request<{}, {}, DriverInputDto>,
  res: Response,
) {
    try {
        // Проекция DTO -> доменная модель; дату создания добавляем здесь.
        const newDriver: Driver = {
            ...mapDriverInputDtoToDriver(req.body),
            createdAt: new Date(),
        };

        const createdDriver = await driversRepository.create(newDriver);
        const driverViewModel = mapToDriverViewModel(createdDriver);
        res.status(HttpStatus.Created).send(driverViewModel);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError);
    }
}