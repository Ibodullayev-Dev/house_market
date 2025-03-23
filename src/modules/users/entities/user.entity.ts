import { ApiProperty } from "@nestjs/swagger";
import { IUser } from "../../../interfaces";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User implements IUser {

  @ApiProperty({ example: "550e8400-e29b-41d4-a716-446655440000", description: "Foydalanuvchi ID (UUID)" })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: "johndoe", description: "Foydalanuvchi logini" })
  @Column({ type: "text" })
  login: string;

  @ApiProperty({ example: "John", description: "Foydalanuvchining ismi" })
  @Column({ type: "text" })
  first_name: string;

  @ApiProperty({ example: "Doe", description: "Foydalanuvchining familiyasi" })
  @Column({ type: "text" })
  last_name: string;

  @ApiProperty({ example: "johndoe@example.com", description: "Email manzili" })
  @Column({ type: "text" })
  email: string;

  @ApiProperty({ example: "admin | user", description: "Foydalanuvchi roli",  })
  @Column({ type: "varchar", default: "user" })
  role?: string;

  @ApiProperty({ example: "hashedpassword123", description: "Foydalanuvchi paroli (hashlangan)" })
  @Column({ type: "text" })
  password: string;

}
