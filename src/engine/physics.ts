import { Entity } from '../types';

// Define the physics engine
export const createPhysics = () => {
  const gravity = 9.8; // Gravitational constant
  const objects: any[] = []; // Array to store physics objects

  // Function to add a physics object to the engine
  function addObject(obj: object) {
    objects.push(obj);
  }

  // Function to update the physics simulation
  function update(dt: number) {
    // Apply forces and update object positions
    for (const object of objects) {
      // Apply gravitational force
      const gravityForce = object.entity.mass * gravity;
      object.applyForce(0, gravityForce, dt);

      // Update object position and velocity
      object.update(dt);
    }

    // Handle collisions
    for (let i = 0; i < objects.length; i++) {
      const objectA = objects[i];

      // Check for collision with other objects
      for (let j = i + 1; j < objects.length; j++) {
        const objectB = objects[j];

        // Check if objects collide
        if (objectA.collidesWith(objectB)) {
          // Resolve collision
          resolveCollision(objectA, objectB);
        }
      }
    }
  }

  // Function to resolve collision between two objects
  function resolveCollision(objectA: any, objectB: any) {
    // Apply simple elastic collision
    const totalMass = objectA.mass + objectB.mass;

    // Calculate velocities after collision using conservation of momentum
    const velocityAx = ((objectA.mass - objectB.mass) * objectA.velocity.x) / totalMass;
    const velocityAy = ((objectA.mass - objectB.mass) * objectA.velocity.y) / totalMass;
    const velocityBx =
      (2 * objectA.mass * objectA.velocity.x + objectB.mass * objectB.velocity.x) / totalMass;
    const velocityBy =
      (2 * objectA.mass * objectA.velocity.y + objectB.mass * objectB.velocity.y) / totalMass;

    // Set new velocities for objects after collision
    objectA.velocity.x = velocityAx;
    objectA.velocity.y = velocityAy;
    objectB.velocity.x = velocityBx;
    objectB.velocity.y = velocityBy;
  }

  return { objects, addObject, update };
};
