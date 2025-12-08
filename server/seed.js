const db = require('./src/models');
const ContentRepo = require('./src/repositories/ContentRepository');

const seed = async () => {
    try {
        console.log('Seeding database');
        await db.sequelize.sync({ force: false });

        const hall1 = await ContentRepo.saveGymHall({ name: 'Main Gym', capacity: 30, location: 'Floor 1', photoUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=300' });
        const hall2 = await ContentRepo.saveGymHall({ name: 'Yoga Studio', capacity: 15, location: 'Floor 2', photoUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=300' });
        const hall3 = await ContentRepo.saveGymHall({ name: 'Gym Alpha', capacity: 15, location: 'Floor 3', photoUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=300' });
        const hall4 = await ContentRepo.saveGymHall({ name: 'Gym Bravo', capacity: 15, location: 'Floor 4', photoUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=300' });
        const hall5 = await ContentRepo.saveGymHall({ name: 'Gym Charlie', capacity: 15, location: 'Floor 5', photoUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=300' });
        const hall6 = await ContentRepo.saveGymHall({ name: 'MMA Gym', capacity: 35, location: 'Some street', photoUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=300' });

        const trainer1 = await ContentRepo.saveTrainer({ firstName: 'Arnold', lastName: 'S.', bio: 'Bodybuilding legend', photoUrl: 'https://placehold.co/100' });
        const trainer2 = await ContentRepo.saveTrainer({ firstName: 'Jessica', lastName: 'Alba', bio: 'Yoga expert', photoUrl: 'https://placehold.co/100' });

        await ContentRepo.saveService({ name: 'Judo', category: 'Fight', difficultyLevel: 'Medium', ageCategory: 'Teens' });
        await ContentRepo.saveService({ name: 'Pilates', category: 'Flexibility', difficultyLevel: 'Easy', ageCategory: 'Adults' });
        await ContentRepo.saveService({ name: 'Karate', category: 'Fight', difficultyLevel: 'Medium', ageCategory: 'Everyone' });
        await ContentRepo.saveService({ name: 'Jiu Jitsu', category: 'Fight', difficultyLevel: 'Medium', ageCategory: 'Everyone' });
        await ContentRepo.saveService({ name: 'MMA', category: 'Fight', difficultyLevel: 'Medium', ageCategory: 'Everyone' });
        await ContentRepo.saveService({ name: 'Cross Fit', category: 'Cardio', difficultyLevel: 'Hard', ageCategory: 'Adults' });
        await ContentRepo.saveService({ name: 'Yoga', category: 'Flexibility', difficultyLevel: 'Easy', ageCategory: 'Everyone' });

        console.log('Database populated!');
    } catch (e) {
        console.error('Error seeding:', e);
    } finally {
        process.exit();
    }
};

seed();