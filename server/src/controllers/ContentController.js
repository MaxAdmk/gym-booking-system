const ContentRepository = require('../repositories/ContentRepository');

class ContentController {

    async getAllServices(req, res) {
        try {
            const data = await ContentRepository.getAllServices();
            res.json(data);
        } catch (e) { res.status(500).json({ error: e.message }); }
    }

    async getAllTrainers(req, res) {
        try {
            const data = await ContentRepository.getAllTrainers();
            res.json(data);
        } catch (e) { res.status(500).json({ error: e.message }); }
    }

    async getAllHalls(req, res) {
        try {
            const data = await ContentRepository.getAllGymHalls();
            res.json(data);
        } catch (e) { res.status(500).json({ error: e.message }); }
    }

}

module.exports = new ContentController();