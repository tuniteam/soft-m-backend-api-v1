import {
  PrismaClient,
  ClientType,
  ClientStatus,
  AccountingSystem,
} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clean existing data
  await prisma.client.deleteMany();
  console.log('🗑️  Cleared existing clients');

  // Create sample clients
  const clients = await Promise.all([
    prisma.client.create({
      data: {
        clientType: ClientType.MAIRIE,
        siret: '21920063500014',
        name: 'Mairie de Saint-Cloud',
        address: 'Place Charles de Gaulle',
        postalCode: '92210',
        city: 'Saint-Cloud',
        email: 'contact@mairie-saint-cloud.fr',
        phone: '+33146021234',
        accountingSystem: AccountingSystem.BERGER_LEVRAULT,
        collectivityCode: 'COLL92210',
        budgetCode: 'BUD2024',
        status: ClientStatus.ACTIVE,
      },
    }),
    prisma.client.create({
      data: {
        clientType: ClientType.MAIRIE,
        siret: '21750001300014',
        name: 'Mairie de Paris',
        address: "Place de l'Hôtel de Ville",
        postalCode: '75004',
        city: 'Paris',
        email: 'contact@paris.fr',
        phone: '+33142762000',
        accountingSystem: AccountingSystem.JVS,
        status: ClientStatus.ACTIVE,
      },
    }),
    prisma.client.create({
      data: {
        clientType: ClientType.CCAS,
        siret: '21690123400015',
        name: 'CCAS de Lyon',
        address: '1 Place de la Comédie',
        postalCode: '69001',
        city: 'Lyon',
        email: 'ccas@lyon.fr',
        phone: '+33472103030',
        status: ClientStatus.DRAFT,
      },
    }),
    prisma.client.create({
      data: {
        clientType: ClientType.SYNDICAT,
        siret: '25330012500012',
        name: "Syndicat Intercommunal du Bassin d'Arcachon",
        address: '15 Allée du Parc',
        postalCode: '33120',
        city: 'Arcachon',
        email: 'contact@siba33.fr',
        phone: '+33556221234',
        accountingSystem: AccountingSystem.COSOLUCE,
        status: ClientStatus.ACTIVE,
      },
    }),
    prisma.client.create({
      data: {
        clientType: ClientType.CENTRE_LOISIRS,
        siret: '78945612300016',
        name: 'Centre de Loisirs Les Petits Princes',
        address: '25 Rue des Enfants',
        postalCode: '44000',
        city: 'Nantes',
        email: 'contact@petitsprinces.fr',
        phone: '+33240123456',
        status: ClientStatus.SUSPENDED,
      },
    }),
  ]);

  console.log(`✅ Created ${clients.length} clients:`);
  clients.forEach((c) => {
    console.log(`   - ${c.name} (${c.clientType}, ${c.status})`);
  });

  console.log('🌱 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
