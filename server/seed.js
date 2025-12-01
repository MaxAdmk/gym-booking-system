const db = require('./src/models');
const ContentRepo = require('./src/repositories/ContentRepository');

const seed = async () => {
    try {
        console.log('Seeding database');
        await db.sequelize.sync({ force: false });

        const hall1 = await ContentRepo.saveGymHall({ name: 'Main Gym', capacity: 30, location: 'Floor 1' });
        const hall2 = await ContentRepo.saveGymHall({ name: 'Yoga Studio', capacity: 15, location: 'Floor 2' });

        const trainer1 = await ContentRepo.saveTrainer({ firstName: 'Arnold', lastName: 'S.', bio: 'Bodybuilding legend', photoUrl: 'https://placehold.co/100' });
        const trainer2 = await ContentRepo.saveTrainer({ firstName: 'Jessica', lastName: 'Alba', bio: 'Yoga expert', photoUrl: 'https://placehold.co/100' });

        await ContentRepo.saveService({ name: 'Crossfit', category: 'Strength', difficultyLevel: 'Hard' });
        await ContentRepo.saveService({ name: 'Pilates', category: 'Flexibility', difficultyLevel: 'Easy' });
        await ContentRepo.saveService({ name: 'Boxing', category: 'Cardio', difficultyLevel: 'Medium' });

        console.log('Database populated!');
    } catch (e) {
        console.error('Error seeding:', e);
    } finally {
        process.exit();
    }
};

seed();