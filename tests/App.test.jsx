import { vi, describe, it, expect, afterEach } from 'vitest';
import {
    render,
    screen,
    getAllByRole,
    fireEvent
} from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createMemoryRouter, createRoutesFromElements, RouterProvider, Route, useLoaderData } from 'react-router-dom';
import App from '../src/App';
import { Sidebar } from '../src/Sidebar';
import { Classroom } from '../src/Classroom';

vi.mock("react-router-dom", async () => {
    const module = await vi.importActual("react-router-dom");
    return {
        ...module,
        useLoaderData: vi.fn()
    }
})

describe("sidebar", () => {

    afterEach(() => {
        vi.clearAllMocks();
        vi.resetAllMocks();
    })

    it("Should render the title 'Class List'", () => {
        render(<Sidebar />);
        expect(screen.getByRole("heading").textContent).toMatch("Class List");
    })

    it("Should render a list of classes in the sidebar", () => {
        useLoaderData.mockReturnValue({
            classrooms:[{
                key:"1",
                name:"Class one",
            },
            {
                key:"2",
                name:"Class two"
            },
        ]});

        const router = createMemoryRouter(
            createRoutesFromElements(
                <Route path="/" element={<App />}>
                    <Route path="classroom/:classroomID" element={<Classroom />} />
                </Route>
            ),
            {
                initialEntries: ['/'],
            }
        ) 

        render(<RouterProvider router={router} />);

        const nav = screen.getByRole("navigation")
        const links = getAllByRole(nav, "link");
        expect(links.length).toBe(2);
    })
})

describe("app", () => {
    afterEach(() => {
        vi.clearAllMocks();
        vi.resetAllMocks();
    })

    it("Should render a sidebar and viewport", () => {
        useLoaderData.mockReturnValue({
            classrooms:[{
                key:"1",
                name:"Class one",
            },
            {
                key:"2",
                name:"Class two"
            },
        ]});

        const router = createMemoryRouter(
            createRoutesFromElements(
                <Route path="/" element={<App />}>
                    <Route path="classroom/:classroomKey" element={<Classroom />} />
                </Route>
            ),
            {
                initialEntries: ['/'],
            }
        )

        render(<RouterProvider router={router} />);

        expect(screen.getByRole("navigation").textContent).toContain("Class List");
    });



    it("Should render a main section", () => {
        useLoaderData.mockReturnValue({
            classrooms:[{
                key:"1",
                name:"Class one",
            },
            {
                key:"2",
                name:"Class two"
            },
        ]});

        const router = createMemoryRouter(
            createRoutesFromElements(
                <Route path="/" element={<App />}>
                    <Route path="classroom/:classroomKey" element={<Classroom />} />
                </Route>
            ),
            {
                initialEntries: ['/'],
            }
        ) 

        render(<RouterProvider router={router} />);
        expect(screen.getByRole("main")).toBeDefined();
    })

    it("Should change class after a link is pressed", async () => {
        useLoaderData.mockReturnValueOnce({
            classrooms:[{
                key:"1",
                name:"Class one",
            },
            {
                key:"2",
                name:"Class two"
            },
        ]});

        const router = createMemoryRouter(
            createRoutesFromElements(
                <Route path="/" element={<App />}>
                    <Route path="classroom/:classroomKey" element={<Classroom />} />
                </Route>
            ),
            {
                initialEntries: ['/'],
            }
        ) 

        render(<RouterProvider router={router} />);

        const links = getAllByRole(screen.getByRole("navigation"),"link");
        useLoaderData.mockReturnValueOnce({
            name:"Class one",
            students:[{
                student:null,
                studentID:"1"
            }],
        });
        fireEvent.click(links[0]);
        expect(screen.getByRole("main").textContent).toContain("Class one");
    })
})

describe("classroom", () => {
    it("Should render the name of the classroom", () => {
        useLoaderData.mockReturnValue({
            name:"Class one",
            students:[{
                student:"",
                studentID:"1",
            }],
        });

        render(<Classroom />)
        expect(screen.getByRole("heading").textContent).toBe("Class one");
    })

    it("Should render a list of students", () => {
        useLoaderData.mockReturnValue({
            name:"Class one",
            students:[
                {
                    first:"Jiwon",
                    last:"Park"
                },
                {
                    first:"Daehan",
                    last:"Choi"
                }
            ]
        })

        render(<Classroom />);
        const students = screen.getAllByRole("listitem")
        expect(students.length).toBe(2)
        expect(students[0].textContent).toContain("Park Jiwon")
        expect(students[1].textContent).toContain("Choi Daehan")
    })
})