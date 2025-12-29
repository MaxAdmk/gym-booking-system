const db = require('./src/models');
const ContentRepo = require('./src/repositories/ContentRepository');

const seed = async () => {
    try {
        console.log('Seeding database');
        await db.sequelize.sync({ force: false });

        const hall1 = await ContentRepo.saveGymHall({ name: 'Main Gym', capacity: 30, location: 'Floor 1', photoUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=300' });
        const hall2 = await ContentRepo.saveGymHall({ name: 'Yoga Studio', capacity: 15, location: 'Floor 2', photoUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=300' });
        const hall3 = await ContentRepo.saveGymHall({ name: 'Gym Alpha', capacity: 15, location: 'Floor 3', photoUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=300' });
        
        const trainer1 = await ContentRepo.saveTrainer({ firstName: 'Arnold', lastName: 'S.', bio: 'Bodybuilding legend', photoUrl: 'https://placehold.co/100' });
        const trainer2 = await ContentRepo.saveTrainer({ firstName: 'Jessica', lastName: 'Alba', bio: 'Yoga expert', photoUrl: 'https://placehold.co/100' });
        const trainer3 = await ContentRepo.saveTrainer({ firstName: 'Mike', lastName: 'Tyson', bio: 'Fighting expert', photoUrl: 'https://placehold.co/100' });

        const judo = await ContentRepo.saveService({ name: 'Judo', category: 'Fight', difficultyLevel: 'Medium', ageCategory: 'Teens', price: 150 });
        const pilates = await ContentRepo.saveService({ name: 'Pilates', category: 'Flexibility', difficultyLevel: 'Easy', ageCategory: 'Adults', price: 150 });
        const karate = await ContentRepo.saveService({ name: 'Karate', category: 'Fight', difficultyLevel: 'Medium', ageCategory: 'Everyone', price: 120 });
        const jiu_jitsu = await ContentRepo.saveService({ name: 'Jiu Jitsu', category: 'Fight', difficultyLevel: 'Medium', ageCategory: 'Everyone', price: 120 });
        const mma = await ContentRepo.saveService({ name: 'MMA', category: 'Fight', difficultyLevel: 'Medium', ageCategory: 'Everyone', price: 150 });
        const crossfit = await ContentRepo.saveService({ name: 'Cross Fit', category: 'Cardio', difficultyLevel: 'Hard', ageCategory: 'Adults', price: 130 });
        const yoga = await ContentRepo.saveService({ name: 'Yoga', category: 'Flexibility', difficultyLevel: 'Easy', ageCategory: 'Everyone', price: 140 });
        const swimming = await ContentRepo.saveService({ name: 'Swimming Pool', category: 'Swimming', difficultyLevel: 'Easy', ageCategory: 'Everyone', price: 200 });

        await hall1.addSportServices([judo, karate, jiu_jitsu, mma]);
        await hall1.addTrainers([trainer3]);
        
        await hall2.addSportServices([pilates, yoga]);
        await hall2.addTrainers([trainer2]);

        await hall3.addSportServices([crossfit, swimming]);
        await hall3.addTrainers([trainer1]);

        console.log('Database populated!');
    } catch (e) {
        console.error('Error seeding:', e);
    } finally {
        process.exit();
    }
};

seed();